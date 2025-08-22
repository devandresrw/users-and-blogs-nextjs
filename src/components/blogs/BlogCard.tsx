import { Blog } from '@/app/api/blogs/route';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, User } from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';

interface BlogCardProps {
  blog: Blog;
  lang: 'en' | 'es';
}

export const BlogCard = memo(({ blog, lang }: BlogCardProps) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <Link href={`/${lang}/blogs/${blog.slug}`}>
        {blog.image && (
          <div className="aspect-video relative overflow-hidden rounded-t-lg">
            <img 
              src={blog.image} 
              alt={blog.title}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-200"
              loading="lazy"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
            {blog.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-3 mb-4">
            {blog.excerpt}
          </p>
          
          <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{blog.author.name}</span>
            <Clock className="h-4 w-4 ml-2" />
            <span>{blog.readTime} min</span>
          </div>

          <div className="flex flex-wrap gap-1">
            {blog.tags.map((tag) => (
              <Badge key={tag.id} variant="secondary" className="text-xs">
                {tag.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
});

BlogCard.displayName = 'BlogCard';