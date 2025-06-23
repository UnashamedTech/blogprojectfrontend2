'use client';

import type React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Calendar, Mail, Shield, User } from 'lucide-react';
import type { User as UserType } from '@/types/user';

interface UserDetailsModalProps {
  user: UserType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  user,
  open,
  onOpenChange,
}) => {
  if (!user) return null;

  const displayName = user.name || user.fullname || 'Unknown User';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              {user.imageUrl && (
                <AvatarImage
                  src={user.imageUrl || '/placeholder.svg?height=48&width=48'}
                  alt={displayName}
                />
              )}
              <AvatarFallback className="text-lg">
                {displayName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{displayName}</h2>
              <p className="text-sm text-muted-foreground">User Details</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <User className="h-5 w-5" />
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Full Name
                </label>
                <p className="text-sm">{displayName}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Email
                </label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{user.email || 'Not provided'}</p>
                </div>
              </div>
              {user.phoneNumber && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Phone Number
                  </label>
                  <p className="text-sm">{user.phoneNumber}</p>
                </div>
              )}
              {user.location && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Location
                  </label>
                  <p className="text-sm">{user.location}</p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Account Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.createdAt && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Joined Date
                  </label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">
                      {new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              )}
              {user.updatedAt && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Last Updated
                  </label>
                  <p className="text-sm">
                    {new Date(user.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>

          {user.imageUrl && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Profile Image</h3>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={
                        user.imageUrl || '/placeholder.svg?height=64&width=64'
                      }
                      alt={displayName}
                    />
                    <AvatarFallback className="text-xl">
                      {displayName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Profile Picture</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsModal;
