"use client";

import React, { useState } from "react";
import Checkbox from "@/shared/Checkbox/Checkbox";
import Slider from "rc-slider";
import Radio from "@/shared/Radio/Radio";
import MySwitch from "@/components/MySwitch";

// DEMO DATA
const DATA_categories = [
  {
    name: "Backpacks",
  },
  {
    name: "Travel Bags",
  },
  {
    name: "Laptop Sleeves",
  },
  {
    name: "Organization",
  },
  {
    name: "Accessories",
  },
];

const DATA_colors = [
  { name: "White" },
  { name: "Beige" },
  { name: "Blue" },
  { name: "Black" },
  { name: "Brown" },
  { name: "Green" },
  { name: "Navy" },
];

const DATA_sizes = [
  { name: "XS" },
  { name: "S" },
  { name: "M" },
  { name: "L" },
  { name: "XL" },
  { name: "2XL" },
];

const DATA_sortOrderRadios = [
  { name: "Most Popular", id: "Most-Popular" },
  { name: "Best Rating", id: "Best-Rating" },
  { name: "Newest", id: "Newest" },
  { name: "Price Low - Hight", id: "Price-low-hight" },
  { name: "Price Hight - Low", id: "Price-hight-low" },
];

const PRICE_RANGE = [1, 500];
//
const SidebarFilters = () => {
  //
  const [isOnSale, setIsIsOnSale] = useState(true);
  const [rangePrices, setRangePrices] = useState([100, 500]);
  const [categoriesState, setCategoriesState] = useState<string[]>([]);
  const [colorsState, setColorsState] = useState<string[]>([]);
  const [sizesState, setSizesState] = useState<string[]>([]);
  const [sortOrderStates, setSortOrderStates] = useState<string>("");

  //
  const handleChangeCategories = (checked: boolean, name: string) => {
    checked
      ? setCategoriesState([...categoriesState, name])
      : setCategoriesState(categoriesState.filter((i) => i !== name));
  };

  const handleChangeColors = (checked: boolean, name: string) => {
    checked
      ? setColorsState([...colorsState, name])
      : setColorsState(colorsState.filter((i) => i !== name));
  };

  const handleChangeSizes = (checked: boolean, name: string) => {
    checked
      ? setSizesState([...sizesState, name])
      : setSizesState(sizesState.filter((i) => i !== name));
  };

  //

  // OK
  const renderTabsCategories = () => {
    return (
      <div className="relative flex flex-col pb-8 space-y-4">
        <h3 className="font-semibold mb-2.5">Categories</h3>
        {DATA_categories.map((item) => (
          <div key={item.name} className="">
            <Checkbox
              name={item.name}
              label={item.name}
              defaultChecked={categoriesState.includes(item.name)}
              sizeClassName="w-5 h-5"
              labelClassName="text-sm font-normal"
              onChange={(checked) => handleChangeCategories(checked, item.name)}
            />
          </div>
        ))}
      </div>
    );
  };

  // OK
  const renderTabsColor = () => {
    return (
      <div className="relative flex flex-col py-8 space-y-4">
        <h3 className="font-semibold mb-2.5">Colors</h3>
        {DATA_colors.map((item) => (
          <div key={item.name} className="">
            <Checkbox
              sizeClassName="w-5 h-5"
              labelClassName="text-sm font-normal"
              name={item.name}
              label={item.name}
              defaultChecked={colorsState.includes(item.name)}
              onChange={(checked) => handleChangeColors(checked, item.name)}
            />
          </div>
        ))}
      </div>
    );
  };

  // OK
  const renderTabsSize = () => {
    return (
      <div className="relative flex flex-col py-8 space-y-4">
        <h3 className="font-semibold mb-2.5">Sizes</h3>
        {DATA_sizes.map((item) => (
          <div key={item.name} className="">
            <Checkbox
              name={item.name}
              label={item.name}
              defaultChecked={sizesState.includes(item.name)}
              onChange={(checked) => handleChangeSizes(checked, item.name)}
              sizeClassName="w-5 h-5"
              labelClassName="text-sm font-normal"
            />
          </div>
        ))}
      </div>
    );
  };

  // OK
  const renderTabsPriceRage = () => {
    return (
      <div className="relative flex flex-col py-8 space-y-5 pr-3">
        <div className="space-y-5">
          <span className="font-semibold">Price range</span>
          <Slider
            range
            min={PRICE_RANGE[0]}
            max={PRICE_RANGE[1]}
            step={1}
            defaultValue={[rangePrices[0], rangePrices[1]]}
            allowCross={false}
            onChange={(_input: number | number[]) =>
              setRangePrices(_input as number[])
            }
          />
        </div>

        <div className="flex justify-between space-x-5">
          <div>
            <label
              htmlFor="minPrice"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Min price
            </label>
            <div className="mt-1 relative rounded-md">
              <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm">
                $
              </span>
              <input
                type="text"
                name="minPrice"
                disabled
                id="minPrice"
                className="block w-32 pr-10 pl-4 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent"
                value={rangePrices[0]}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="maxPrice"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Max price
            </label>
            <div className="mt-1 relative rounded-md">
              <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm">
                $
              </span>
              <input
                type="text"
                disabled
                name="maxPrice"
                id="maxPrice"
                className="block w-32 pr-10 pl-4 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent"
                value={rangePrices[1]}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // OK
  const renderTabsSortOrder = () => {
    return (
      <div className="relative flex flex-col py-8 space-y-4">
        <h3 className="font-semibold mb-2.5">Sort order</h3>
        {DATA_sortOrderRadios.map((item) => (
          <Radio
            id={item.id}
            key={item.id}
            name="radioNameSort"
            label={item.name}
            defaultChecked={sortOrderStates === item.id}
            sizeClassName="w-5 h-5"
            onChange={setSortOrderStates}
            className="!text-sm"
          />
        ))}
      </div>
    );
  };

  return (
    <div className="divide-y divide-slate-200 dark:divide-slate-700">
      {renderTabsCategories()}
      {renderTabsColor()}
      {renderTabsSize()}
      {renderTabsPriceRage()}
      <div className="py-8 pr-2">
        <MySwitch
          label="On sale!"
          desc="Products currently on sale"
          enabled={isOnSale}
          onChange={setIsIsOnSale}
        />
      </div>
      {renderTabsSortOrder()}
    </div>
  );
};

export default SidebarFilters;
