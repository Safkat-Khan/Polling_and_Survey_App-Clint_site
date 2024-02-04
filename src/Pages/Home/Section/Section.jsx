/* eslint-disable react/no-unescaped-entities */
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

const Section = () => {
    return (
        <div className="w-full px-4 pt-16  bg-lime-100">
            <h3 className='text-center text-4xl font-semibold text-rose-500 mb-12'>Frequently Asked Questions (FAQ)</h3>
        <div className="mx-auto w-full max-w-md rounded-2xl bg-lime-100 p-2 pb-10  ">
        
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75  lg:text-4xl ">
                  <span>How do I create a new survey?</span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500 lg:text-xl">
                You can create a new survey by navigating to the Dashboard and selecting the "Create Survey" option.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-700 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500/75 lg:text-4xl">
                  <span>Can I update my survey questions after publishing?</span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500 lg:text-xl">
                Yes, once a survey is published, you can update the questions to maintain data integrity.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75 lg:text-4xl">
                  <span>How do I comment on a survey?</span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500 lg:text-xl">
                Only pro users can comment in a survey. You must be a Pro User member.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-700 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500/75 lg:text-4xl">
                  <span>How to become a pro user?</span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500 lg:text-xl">
                You have to pay for membership on the pro user page.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75 lg:text-4xl">
                  <span>Can I report a survey?</span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500 lg:text-xl">
                Only logged-in users can report in surveys.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    );
};

export default Section;