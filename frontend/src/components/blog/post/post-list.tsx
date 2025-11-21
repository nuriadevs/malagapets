import PostCard from "@/components/blog/cards/post-card";
import {PostListProps} from "@/types/blog";


export default function PostList({
  post,
  variant = "default",
  pathPrefix = "",
  preloadImage = false
}: PostListProps) {
  return (
    <PostCard
      post={post}
      variant={variant}
      pathPrefix={pathPrefix}
      preloadImage={preloadImage}
    />
  );
}