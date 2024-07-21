import React from "react";
import CardCategory2 from "./CardCategories/CardCategory2";
import Heading from "./Heading/Heading";
import img1 from "@/images/discover-more-1.png";
import img2 from "@/images/discover-more-2.png";
import img3 from "@/images/discover-more-3.png";

const CATS_DISCOVER = [
  {
    name: "Explore New Arrivals",
    desc: "Shop the Latest from Top Brands",
    featuredImage: img1,
  },
  {
    name: "Digital Gift Cards",
    desc: "Give the Gift of Choice",
    featuredImage: img2,
    //   "https://images.pexels.com/photos/45238/gift-made-surprise-loop-45238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Sale Collection",
    desc: "Up to 80% Off Retail",
    featuredImage: img3,
  },
];

const DiscoverMoreGrid = () => {
  return (
    <div className="nc-DiscoverMoreGrid relative">
      <Heading
        className="mb-12 text-neutral-900 dark:text-neutral-50"
        desc=""
        isCenter
        rightDescText="Good things are waiting for you"
      >
        Discover more
      </Heading>
      <div className="relative grid grid-cols-3 gap-8">
        {CATS_DISCOVER.map((item, index) => (
          <CardCategory2
            key={index}
            name={item.name}
            desc={item.desc}
            featuredImage={item.featuredImage}
          />
        ))}
      </div>
    </div>
  );
};

export default DiscoverMoreGrid;
