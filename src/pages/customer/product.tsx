import { useParams } from "react-router";
import Header from "../../components/customer/home/Header.component";
import ProductMenu from "../../components/customer/products/Product.component";


export default function Product() {
const { id } = useParams<{ id: string }>();
    return (
        <div className="min-h-dvh flex items-center justify-center prompt-regular">
            <div className="sm:w-[450px]  w-full h-dvh overflow-hidden">
                <div className="h-dvh overflow-y-auto">
                    <Header />
                    <div className="h-5"></div>
                    <ProductMenu id={id || ''} />
                </div>
            </div>
        </div>
    )
}