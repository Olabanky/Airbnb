"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string"; /*after installing query-string*/

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  // lets assign thigns to our url using router
  const router = useRouter();
  // we no longer ue router.query, instead we use
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    // lets define the current querry. an empty query
    let currentQuery =
      {}; /*we installed a package called query-string(npm install query-string)*/

    /** we have to check if we have params at all */
    /**we look through the current paramsand parse them so they are an object and not a string because params.toSring are string by default*/
    if (params) {
      currentQuery = qs.parse(
        params.toString()
      ); /**we ar basically creating an object out of all our current parameters since we will have other parameters in future */
    }

    //then we spread that currentQuery and add new category there
    const updatedQuery: any = {
      ...currentQuery,
      category:
        label /**whe we click on one of the labels, the category param will appear in our url */,
    };
    //   then we chack if the new category is already being selected and we remove it from our updated query. obviuosly, we want to deselect it  if we are clicking on it again
    // just like toggle on and off
    if (params?.get("category") == label) {
      delete updatedQuery.category;
    }

    //   then we generate the url string and pass the updated query which we already manipulated above
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery /**updated category */,
      },
      { skipNull: true }
    ); /**removed all empty options */

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`
            flex
            flex-col
            items-center
            justify-center
            gap-2
            p-3
            border-b-2
            hover:text-neutral-800
            transition
            cursor-pointer
            ${selected ? "border-b-neutral-800" : "border-transparent"}
            ${selected ? "text-neutral-800" : "text-neutal-500"}
        `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
