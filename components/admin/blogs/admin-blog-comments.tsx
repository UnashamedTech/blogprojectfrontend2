'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

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

interface AdminBlogCommentsProps {
  blogId: number;
}

const MOCK_ADMIN_USER = {
  userId: 'admin-123',
  userName: 'Admin User',
  userImage: '/images/admin-avatar.png',
};

export default function AdminBlogComments({ blogId }: AdminBlogCommentsProps) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      {
        id: '2',
        userId: 'user3',
        userName: 'John Smith',
        userImage: '/placeholder.svg',
        content: 'Great article! Looking forward to more content like this.',
        createdAt: new Date('2024-02-04T09:00:00Z'),
        likes: 88,
        replies: [],
      },
    ];
    setComments(mockComments);
  }, [blogId]);

  const handleSubmitComment = async () => {
    if (!comment.trim()) return;

    setIsSubmitting(true);
    const newComment: Comment = {
      id: Date.now().toString(),
      userId: MOCK_ADMIN_USER.userId,
      userName: MOCK_ADMIN_USER.userName,
      userImage: MOCK_ADMIN_USER.userImage,
      content: comment,
      createdAt: new Date(),
      likes: 0,
      replies: [],
    };
    setComments(prev => [newComment, ...prev]);
    setComment('');
    setIsSubmitting(false);
  };

  const handleSubmitReply = async (commentId: string) => {
    if (!replyContent.trim()) return;

    setIsSubmitting(true);
    const newReply: Reply = {
      id: Date.now().toString(),
      userId: MOCK_ADMIN_USER.userId,
      userName: MOCK_ADMIN_USER.userName,
      userImage: MOCK_ADMIN_USER.userImage,
      content: replyContent,
      createdAt: new Date(),
      likes: 0,
    };
    
    setComments(prevComments => 
      prevComments.map(c => 
        c.id === commentId 
          ? {...c, replies: [...c.replies, newReply]} 
          : c
      )
    );
    setReplyContent('');
    setReplyingTo(null);
    setIsSubmitting(false);
  };

  const handleLike = (commentId: string, replyId?: string) => {
    setComments(prevComments => 
      prevComments.map(c => {
        if (c.id === commentId) {
          if (replyId) {
            return {
              ...c,
              replies: c.replies.map(r => 
                r.id === replyId ? {...r, likes: r.likes + 1} : r
              )
            };
          }
          return {...c, likes: c.likes + 1};
        }
        return c;
      })
    );
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Responses ({comments.length})
      </h2>

      <div className="mb-8 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
        <Textarea
          placeholder="What are your thoughts as an admin?"
          value={comment}
          onChange={e => setComment(e.target.value)}
          className="mb-2 bg-white dark:bg-gray-600 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          rows={3}
        />
        <div className="flex justify-end">
          <Button
            onClick={handleSubmitComment}
            disabled={isSubmitting || !comment.trim()}
            className="bg-green-500 hover:bg-green-600 text-white dark:bg-green-600 dark:hover:bg-green-700"
          >
            Respond
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        {comments.map(comment => (
          <div 
            key={comment.id} 
            className="border-b pb-8 border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center mb-2">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={comment.userImage} alt={comment.userName} />
                <AvatarFallback>
                  {comment.userName.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold text-gray-700 dark:text-gray-200">
                  {comment.userName}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(comment.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
              </div>
            </div>
            
            <div className="mt-2 mb-4 text-gray-800 dark:text-gray-100">
              {comment.content}
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                onClick={() => handleLike(comment.id)}
              >
                <Heart className="h-5 w-5" />
                <span>{comment.likes}</span>
              </button>
              
              <button
                className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
              >
                <MessageSquare className="h-5 w-5" />
                <span>{comment.replies.length}</span>
              </button>
              
              <Button
                variant="link"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 p-0 h-auto"
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
              >
                Reply
              </Button>
            </div>

            {replyingTo === comment.id && (
              <div className="mt-4 pl-10">
                <Textarea
                  placeholder="Write a reply..."
                  value={replyContent}
                  onChange={e => setReplyContent(e.target.value)}
                  className="mb-2 bg-white dark:bg-gray-600 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                  rows={2}
                />
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setReplyingTo(null)}
                    className="dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleSubmitReply(comment.id)}
                    disabled={isSubmitting || !replyContent.trim()}
                    className="bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    Reply
                  </Button>
                </div>
              </div>
            )}

            {comment.replies.length > 0 && (
              <div className="mt-4 pl-10 space-y-4">
                {comment.replies.map(reply => (
                  <div 
                    key={reply.id} 
                    className="border-t pt-4 border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center mb-2">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={reply.userImage} alt={reply.userName} />
                        <AvatarFallback>
                          {reply.userName.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-gray-700 dark:text-gray-200">
                          {reply.userName}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDistanceToNow(new Date(reply.createdAt), {
                            addSuffix: true,
                          })}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-2 text-gray-800 dark:text-gray-100">
                      {reply.content}
                    </div>
                    
                    <div className="mt-2">
                      <button
                        className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                        onClick={() => handleLike(comment.id, reply.id)}
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
    </div>
  );
}