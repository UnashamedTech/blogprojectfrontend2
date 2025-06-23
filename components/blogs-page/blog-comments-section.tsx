'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '@/hooks/use-auth';
import LoginPageCard from '@/components/login-page/login-page-card';

// Types
interface Comment {
  id: string;
  userId: string;
  userName: string;
  userImage: string;
  content: string;
  createdAt: Date;
  likes: number;
  replies: Reply[];
}

interface Reply {
  id: string;
  userId: string;
  userName: string;
  userImage: string;
  content: string;
  createdAt: Date;
  likes: number;
}

interface BlogCommentsProps {
  blogId: number;
}

export default function BlogComments({ blogId }: BlogCommentsProps) {
  const { user, loading, checkAuth } = useAuth();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoginCard, setShowLoginCard] = useState(false);

  // Fetch comments for this blog post
  useEffect(() => {
    const mockComments: Comment[] = [
      {
        id: '1',
        userId: 'user1',
        userName: 'Eyosias Solomon',
        userImage: '/placeholder.svg',
        content: 'Lorem ipsum dolor sit amet...',
        createdAt: new Date('2024-02-03'),
        likes: 246,
        replies: [],
      },
    ];
    setComments(mockComments);
  }, [blogId]);

  const requireAuth = async (action: () => Promise<void>) => {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
      // Save the blogId so the user can be redirected back after login
      sessionStorage.setItem('redirectBlogId', blogId.toString());
      setShowLoginCard(true);
      return;
    }
    await action();
  };

  const handleSubmitComment = async () => {
    if (!comment.trim()) return;

    await requireAuth(async () => {
      setIsSubmitting(true);
      const newComment: Comment = {
        id: Date.now().toString(),
        userId: user!.userId!,
        userName: user!.userName!,
        userImage: user!.imageUrl || '/placeholder.svg',
        content: comment,
        createdAt: new Date(),
        likes: 0,
        replies: [],
      };
      setComments((prev) => [newComment, ...prev]);
      setComment('');
      setIsSubmitting(false);
    });
  };

  const handleSubmitReply = async (commentId: string) => {
    if (!replyContent.trim()) return;

    await requireAuth(async () => {
      setIsSubmitting(true);
      const newReply: Reply = {
        id: Date.now().toString(),
        userId: user!.userId!,
        userName: user!.userName!,
        userImage: user?.imageUrl || '/placeholder.svg',
        content: replyContent,
        createdAt: new Date(),
        likes: 0,
      };

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? { ...comment, replies: [...comment.replies, newReply] }
            : comment
        )
      );
      setReplyContent('');
      setReplyingTo(null);
      setIsSubmitting(false);
    });
  };

  const handleLike = async (commentId: string) => {
    await requireAuth(async () => {
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? { ...comment, likes: comment.likes + 1 }
            : comment
        )
      );
    });
  };

  if (loading) return <div>Loading comments...</div>;

  if (showLoginCard) {
    return (
      <div className="w-full p-8 flex justify-center">
        <div className="max-w-md w-full">
          <LoginPageCard />
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={() => setShowLoginCard(false)}
          >
            Back to Comments
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">Responses ({comments.length})</h2>

      {/* Comment input */}
      <div className="mb-8 bg-gray-100 p-4 rounded-lg">
        <Textarea
          placeholder="What are your thoughts?"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mb-2 bg-white"
          rows={3}
          onClick={() => requireAuth(async () => {})}
        />
        <div className="flex justify-end">
          <Button
            onClick={handleSubmitComment}
            disabled={isSubmitting || !comment.trim()}
            className="bg-green-500 hover:bg-green-600"
          >
            Respond
          </Button>
        </div>
      </div>

      {/* Comments list */}
      {user && (
        <div className="space-y-8">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b pb-8">
              <div className="flex items-center mb-2">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={comment.userImage} alt={comment.userName} />
                  <AvatarFallback>
                    {comment.userName.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-gray-500">
                    {comment.userName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {comment.createdAt.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-2 mb-4">{comment.content}</div>

              <div className="flex items-center space-x-4">
                <button
                  className="flex items-center space-x-1 text-gray-600"
                  onClick={() => handleLike(comment.id)}
                >
                  <Heart className="h-5 w-5" />
                  <span>{comment.likes}</span>
                </button>

                <button
                  className="flex items-center space-x-1 text-gray-600"
                  onClick={() =>
                    requireAuth(async () =>
                      setReplyingTo(
                        replyingTo === comment.id ? null : comment.id
                      )
                    )
                  }
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>{comment.replies.length}</span>
                </button>

                <button
                  className="text-gray-600"
                  onClick={() =>
                    requireAuth(async () =>
                      setReplyingTo(
                        replyingTo === comment.id ? null : comment.id
                      )
                    )
                  }
                >
                  Reply
                </button>
              </div>

              {/* Reply form */}
              {replyingTo === comment.id && (
                <div className="mt-4 pl-10">
                  <Textarea
                    placeholder="Write a reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="mb-2"
                    rows={2}
                  />
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setReplyingTo(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => handleSubmitReply(comment.id)}
                      disabled={isSubmitting || !replyContent.trim()}
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              )}

              {/* Replies */}
              {comment.replies.length > 0 && (
                <div className="mt-4 pl-10 space-y-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="border-t pt-4">
                      <div className="flex items-center mb-2">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage
                            src={reply.userImage}
                            alt={reply.userName}
                          />
                          <AvatarFallback>
                            {reply.userName.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{reply.userName}</div>
                          <div className="text-xs text-gray-500">
                            {formatDistanceToNow(reply.createdAt, {
                              addSuffix: true,
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="mt-2">{reply.content}</div>
                      <div className="mt-2">
                        <button
                          className="flex items-center space-x-1 text-gray-600"
                          onClick={() =>
                            requireAuth(async () => {
                              setComments((prevComments) =>
                                prevComments.map((c) =>
                                  c.id === comment.id
                                    ? {
                                        ...c,
                                        replies: c.replies.map((r) =>
                                          r.id === reply.id
                                            ? { ...r, likes: r.likes + 1 }
                                            : r
                                        ),
                                      }
                                    : c
                                )
                              );
                            })
                          }
                        >
                          <Heart className="h-4 w-4" />
                          <span>{reply.likes}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
