import BackButton from "../../_components/organisms/backbutton/BackButton";
import ProductInfo from "./_components/organisms/productInfo/ProductInfo";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="mt-0 flex flex-col">
      <BackButton className="hidden md:mb-5 md:block" />
      <ProductInfo name={params.slug} />
    </div>
  );
}
