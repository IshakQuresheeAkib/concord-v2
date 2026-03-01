const CountCard = ({heading,count}) => {
    return (
        <div className="block">
            <div className="rounded-2xl bg-gray w-72 h-52 p-4">
                <div className="flex justify-end">
                    <div className="h-4 w-4 rounded-full bg-white "></div>
                </div>
                <div>
                    <p className="text-center text-3xl font-extrabold text-gray-900 mb-6">{heading}</p>
                    <p className="text-center text-3xl font-extrabold text-teal">{count}</p>
                </div>
            </div>
        </div>
    )}
export default CountCard;