const SectionTitile = ({ heading, subHeading }) => {
    return (
        <div className="flex flex-col justify-center  my-12 w-4/12 mx-auto text-center">
            <p className="text-yellow-600 mb-2">---{subHeading}---</p>
            <h1 className="text-4xl border-y-2 inline-block  py-4 uppercase ">{heading}</h1>

        </div>
    );
};

export default SectionTitile;