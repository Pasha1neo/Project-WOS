import style from './Preloader.module.css'

const Preloader = () => {
    return (
        <div className={style.preloaderBlock}>
            ...loading
            {/* <img src='oval.svg' alt='preloader' className={style.preloader} /> */}
        </div>
    )
}

export default Preloader
