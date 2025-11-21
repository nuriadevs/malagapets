import Link from "next/link";
import Label from "@/components/ui/blog/label";
import { CategoryLabelProps } from "@/types/blog";



export default function CategoryLabel({
  categories,
  nomargin = false
}: CategoryLabelProps) {
  return (
    <div className="flex gap-3">
      {categories?.length &&
        categories.map((category, index) => {
          // Normaliza el slug - maneja tanto string como objeto
          const slug = typeof category.slug === 'string'
            ? category.slug
            : category.slug?.current || '';

          // Normaliza el nombre - maneja tanto 'name' como 'title'
          const categoryName = category.name || category.title || 'Sin categoría';

          return (
            <Link
              href={`/blog/categories/${slug}`}
              key={index}>
              <Label
                color={category.color as "green" | "blue" | "orange" | "purple" | "pink"}
                nomargin={nomargin}
              >
                {categoryName}
              </Label>
            </Link>
          );
        })}
    </div>
  );
}