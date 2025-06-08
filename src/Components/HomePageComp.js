const HomePageComp = () => {
  return (
    <div className=" px-6  lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Navigating Educational Trends: What's Making Waves.{" "}
            <a href="/blogs" className="font-semibold text-[#4F6F52]">
              <span className="absolute inset-0" aria-hidden="true" />
              Read more <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Beyond the Classroom: Exploring Education
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Explore the educational frontier with our blog, diving into the
            latest trends shaping the future of learning and innovation in
            today's dynamic educational landscape, Stay ahead in the world of
            education where we unravel the hottest topics.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/blogs"
              className="rounded-md bg-[#4F6F52] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F97C99]"
            >
              Read Blogs
            </a>
            <a
              href="/add-new-blog"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Add a blog <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePageComp;
