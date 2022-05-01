import { useRouter } from "next/router";
import ProductScreen from "../../components/ProductScreen";

const CategoryPage = (props) => {
  const router = useRouter();

  return <ProductScreen {...props} />;
};

export const getStaticPaths = () => {
  return {
    paths: [
      {params: {
        id: "tv"
      }}
    ],
    fallback: false,
  }
};

export const getStaticProps = ({ params }) => {
  // create dummy data
  const products = {
    tv: {
      image: "/images/tv-0.png",
      title: "LG Z1 88 inch 8K Smart OLED TV",
      price: "$400",
      description: `
    - LG Real 8K SELF-LIT OLED for extraordinary detail and contrast
    - α9 Gen4 AI processor 8K with AI 8K upscaling
    - Premium slim design & sleek floor stand
    - Immersive cinema and sport with Dolby Vision IQ & Dolby Atmos
    - Premium 8K gaming experience – HDMI 2.1, HFR, VRR and more
    - 5 Year Limited Parts & Labour Panel Warranty
  `,
    },
  };

  return {
    props: {...products[params.id]}
  }

  return products[params.id];
};

export default CategoryPage;
