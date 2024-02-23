"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { CarDetailsProps } from "@/types";
import Image from "next/image";
import { getImageUrls } from "@/utils";

const CarDetails = ({ isOpen, closeModal, car }: CarDetailsProps) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    const getUrl = async () => {
      const query = `${car.make} ${car.model}`;
      const urls = await getImageUrls(query, 4);
      setImageUrls(urls);
    };
    getUrl();
  }, []);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] transform overflow-y-auto rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
                  <button
                    type="button"
                    className="absolute z-10 p-2 rounded-full top-2 right-2 w-fit bg-primary-blue-100"
                    onClick={closeModal}
                  >
                    <Image
                      src="/close.svg"
                      alt="close"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </button>
                  <div className="flex flex-wrap gap-3">
                    {imageUrls.length > 0 ? (
                      imageUrls.map((imageUrl, index) => {
                        if (index === 0) {
                          return (
                            <div
                              key={imageUrl}
                              className="w-full bg-cover rounded-lg h-60 bg-pattern"
                            >
                              <img
                                src={imageUrl}
                                alt={`${car.make} ${car.model}`}
                                className="object-cover rounded-lg aspect-video"
                              />
                            </div>
                          );
                        } else {
                          return (
                            <div
                              key={imageUrl}
                              className="w-[100px] h-[72px] rounded-lg md:w-40 md:h-24 bg-primary-blue-100"
                            >
                              <img
                                src={imageUrl}
                                alt={`${car.make} ${car.model}`}
                                className="object-cover rounded-lg aspect-video"
                              />
                            </div>
                          );
                        }
                      })
                    ) : (
                      <div className="relative w-full bg-cover rounded-lg h-60 bg-pattern">
                        <Image
                          src="/no-image.png"
                          alt={`${car.make} ${car.model}`}
                          fill
                          priority
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col flex-1 gap-2">
                    <h2 className="text-xl font-semibold capitalize">
                      {car.make} {car.model}
                    </h2>
                    <div className="flex flex-col flex-wrap gap-4 mt-3">
                      {Object.entries(car).map(([key, value]) => (
                        <div
                          className="flex justify-between w-full gap-5"
                          key={key}
                        >
                          <h4 className="capitalize text-gray">
                            {key.split("_").join(" ")}
                          </h4>
                          <p className="font-semibold text-black-100">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CarDetails;
