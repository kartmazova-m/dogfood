import s from "./ContentHeader.module.css";

const ContentHeader = ({title, children}) => {

  return (
    <>
      <div>
        <a href="#" className={s.buttonBack}>Назад</a>
        <h1 className={s.title}>{title}</h1>
        {children}
      </div>
    </>
  );
};

export default ContentHeader;
