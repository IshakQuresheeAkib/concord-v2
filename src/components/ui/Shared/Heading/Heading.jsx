import './styles.css'

const Heading = ({children}) => {
    return <div className='one' data-aos='fade-bottom'>
<h1 className='h1 2xl:text-6xl text-5xl'>{children}</h1>
    </div>
}
export default Heading;