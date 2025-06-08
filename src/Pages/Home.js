import HeaderSection from "../Components/HeaderSection";
import HomePageComp from "../Components/HomePageComp";
import { Helmet } from "react-helmet";

function Home() {
 

  return (
    <div>
    <Helmet>
  <title>Home - MindSpring</title>
  <meta name="description" content="View your favorite blogs on your personalized dashboard." />
  <meta name="keywords" content="blogs, favorites, dashboard, user, blog app" />
  <meta name="author" content="MindSpring" />
</Helmet>

      <HeaderSection>
        <div>
          <img src="/education.jpg" className="h-[200px] w-full object-cover sm:h-full" />
        </div>
        <div className="sm:my-12 my-8">
          <HomePageComp />
        </div>
      </HeaderSection>
    </div>
  );
}
export default Home;

// import {useState,useEffect} from "react"
// // import './styles.css'
// // import ProductCard from './ProductCard.js'
// import { FiChevronsLeft,FiChevronsRight } from "react-icons/fi";

// const PAGE_SIZE = 10;

// const Home = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchProducts();
//   }, [currentPage]);

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`https://dummyjson.com/products?limit=200`);
//       const data = await response.json();
//       setProducts(data.products);
//       setTotalPages(Math.ceil(data.total / PAGE_SIZE));
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   console.log(Math.ceil(products.length / 10));
  
// return (
//   <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
//     <h1 style={{ fontSize: "24px", marginBottom: "16px" }}>Pagination</h1>
//     <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
      
//       {/* First Page Button */}
//       <div
//         style={{
//           padding: "10px",
//           backgroundColor: "#e0e0e0",
//           borderRadius: "5px",
//           cursor: "pointer",
//           opacity: currentPage === 1 ? 0.5 : 1,
//           cursor: currentPage === 1 ? "not-allowed" : "pointer",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           minWidth: "40px"
//         }}
//         onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
//       >
//         <FiChevronsLeft />
//       </div>

//       {/* Page Numbers */}
//       {products.length > 0 &&
//         Array.from({ length: Math.ceil(products.length / 10) }, (_, index) => (
//           <div
//             key={index}
//             style={{
//               padding: "10px 15px",
//               backgroundColor: currentPage === index + 1 ?"gray":"#f0f0f0",
//               borderRadius: "5px",
//               cursor: "pointer",
//               textAlign: "center",
//               minWidth: "40px"
//             }}
//             onClick={() => setCurrentPage(index + 1)}
//           >
//             {index + 1}
//           </div>
//         ))}

//       {/* Last Page Button */}
//       <div
//         style={{
//           padding: "10px",
//           backgroundColor: "#e0e0e0",
//           borderRadius: "5px",
//           opacity: currentPage === totalPages ? 0.5 : 1,
//           cursor: currentPage === totalPages ? "not-allowed" : "pointer",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           minWidth: "40px"
//         }}
//         onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
//       >
//         <FiChevronsRight />
//       </div>
//     </div>


//     {products.length > 0 && (
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "10px", marginTop: "20px" }}>
//            {products
//       .slice((currentPage - 1) , currentPage + PAGE_SIZE)
//       .map((product) => {
//         return (
//           <ProductCard
//             key={product.id}
//             image={product.thumbnail}
//             title={product.title}
//           />
//         );
//       })}

//       </div>
//     )}
//   </div>
// );
// };
// export default Home;

// const ProductCard= ({image,title})=>{
//   return (
//     <div>
//       <img src={image} alt={title} className="w-full h-48 object-cover" />
//       <h2 className="text-lg font-semibold">{title}</h2>
//     </div>
//   )
// }