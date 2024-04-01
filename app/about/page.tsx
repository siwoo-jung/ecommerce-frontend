import Image from "next/image";

const page = () => {
  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-row relative justify-around max-md:flex-col max-lg:gap-10">
        <div className="flex flex-col gap-10 justify-center w-1/3 max-md:w-full items-center">
          <p className="text-[100px] font-bold max-lg:text-[50px]">Our Story</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos saepe
            quae numquam repudiandae reprehenderit molestiae, iste architecto et
            iusto, aperiam voluptatem totam temporibus autem quas aliquid
            nostrum ad, repellendus quia!
          </p>
        </div>
        <Image
          src="/assets/images/about.jpg"
          alt="about"
          height={500}
          width={500}
          className="object-scale-down"
        ></Image>
      </div>
      <div className="flex flex-row relative justify-around max-md:flex-col max-lg:gap-10">
        <div className="flex-col gap-10 justify-center w-1/3 max-md:w-full items-center hidden max-sm:flex">
          <p className="text-[100px] font-bold max-lg:text-[50px]">
            Our Mission
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos saepe
            quae numquam repudiandae reprehenderit molestiae, iste architecto et
            iusto, aperiam voluptatem totam temporibus autem quas aliquid
            nostrum ad, repellendus quia!
          </p>
        </div>
        <Image
          src="/assets/images/about.jpg"
          alt="about"
          height={500}
          width={500}
          className="object-scale-down"
        ></Image>
        <div className="flex flex-col gap-10 justify-center w-1/3 max-md:w-full items-center max-sm:hidden">
          <p className="text-[100px] font-bold max-lg:text-[50px]">
            Our Mission
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos saepe
            quae numquam repudiandae reprehenderit molestiae, iste architecto et
            iusto, aperiam voluptatem totam temporibus autem quas aliquid
            nostrum ad, repellendus quia!
          </p>
        </div>
      </div>
    </section>
  );
};

export default page;
