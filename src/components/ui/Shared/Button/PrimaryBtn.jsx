const PrimaryBtn = ({data,icon,htmlType}) => {
    return (
      <div className="group relative overflow-hidden bg-light-teal  inline-flex items-center  text-black justify-center cursor-pointer rounded-3xl py-1.5 px-2.5">
      <button htmlType={htmlType} type="dark" className=" rounded-3xl font-medium text-white border-none " icon={icon}>{data}</button>
      <div className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-80%] transition-all group-hover:scale-100 bg-white/30 group-hover:translate-x-[50%] duration-1000">
      </div>
    </div>
    )}
export default PrimaryBtn;