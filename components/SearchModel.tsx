"use client";

import { Combobox, Transition } from "@headlessui/react";
import { SearchModelProps } from "@/types";
import { Fragment, useState } from "react";
import Image from "next/image";

import { models } from "@/constants";

const SearchModel = ({ manufacturer, model, setModel }: SearchModelProps) => {
  const [query, setQuery] = useState("");

  if (!manufacturer) {
    return null;
  }
  const makeModels = models[manufacturer];

  const filteredModels =
    query === ""
      ? makeModels
      : makeModels.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="search-manufacturer">
      <Combobox value={model} onChange={setModel}>
        <div className="relative w-full">
          <Combobox.Button className="absolute top-[14px]">
            <Image
              src="/model-icon.png"
              alt="car-model"
              className="ml-4"
              width={20}
              height={20}
            />
          </Combobox.Button>
          <Combobox.Button className="absolute top-[14px] right-3">
            <Image
              src="/chevron-up-down.svg"
              alt="car-logo"
              width={20}
              height={20}
            />
          </Combobox.Button>
          <Combobox.Input
            className="searchbar__input"
            placeholder="Model(corolla)"
            displayValue={(model: string) => model}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="search-manufacturer__options">
              {filteredModels.map((item) => (
                <Combobox.Option
                  key={item}
                  value={item}
                  className={({ active }) =>
                    `relative search-manufacturer__option ${
                      active ? "bg-primary-blue text-white" : "text-gray-900"
                    }`
                  }
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {item}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-teal-600"
                          }`}
                        ></span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchModel;
