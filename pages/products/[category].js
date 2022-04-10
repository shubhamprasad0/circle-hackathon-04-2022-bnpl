import { useRouter } from "next/router";

const CategoryPage = () => {
  const router = useRouter();
  const { category } = router.query;

  return <h1>{category}</h1>;
}

export default CategoryPage;