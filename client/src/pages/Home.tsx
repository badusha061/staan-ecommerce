import UserLayouts from '@/Layouts/UserLayouts';
import { HeroParallax } from '@/components/ui/hero-parallax'

function Home() {
  return (
    <div>
      <UserLayouts>
        <HeroParallax products={products} />
      </UserLayouts>
    </div>
  )
}

export const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqR4ZaAXlRBJWlVhg30DHdGXznArx5o1USuw&s",
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail:
      "https://www.staan.in/wp-content/uploads/2016/09/mission1.jpg",
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail:
      "https://media.licdn.com/dms/image/C5622AQGWUg9tP9w7CA/feedshare-shrink_800/0/1643018477989?e=2147483647&v=beta&t=olfNf7iV3EC7Vb1ygxbCPV1o7tCq0taYjPpafylyp14",
  },

  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW3e-OOpTLvg5ybM-8Mdl4m-lw9P2_qAWW-g&s",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail:
      "https://www.staan.in/wp-content/uploads/2016/09/Tourniquet-2-520x340.jpg",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail:
      "https://5.imimg.com/data5/YF/GV/MY-1114682/operation-table-500x500.jpg",
  },
  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail:
      "https://www.staan.in/wp-content/uploads/2017/09/Discover-LED.jpg",
  },


  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2Pnj0Qng3mJL6fePcTys72f_YYSMbHvN5Ng&s",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-z-rCqg13a2XCn_xTs4smOlHx_OrvfM0wXgei3zE5ReKZj2-gr5Hx_Y392Ls6HqH6p-k&usqp=CAU",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSj2W9lPrkOWwhdjs056nmdzmNDjmdjhVPOkuFotI6Kbc7jzkqcbosRY6aP6AvhhJx3A8&usqp=CAU",
  },

  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
  },

  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/invoker.png",
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
  },
];


export default Home