import { useEffect } from "react";

export default function NasaModal({ content, onClose }) {
  useEffect(() => {
    if (!content) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [content, onClose]);

  if (!content) return null;

  const items = content.gallery ?? [content];
  const sections = content.sections ?? [];

  return (
    <div className="modal" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal__box" onClick={(e) => e.stopPropagation()}>
        <header>
          <h3>NASA Data 🚀 {content.title}</h3>
          <button className="modal__x" onClick={onClose} aria-label="Close">×</button>
        </header>
        {content.gallery ? (
          <div className="modal__gallery">
            {items.map((item) => (
              <figure className="modal__item" key={item.src}>
                {item.video ? (
                  <video src={item.src} controls preload="metadata" playsInline aria-label={item.title} />
                ) : (
                  <img src={item.src} alt={item.title} />
                )}
                <figcaption>
                  <h4>{item.title}</h4>
                  <p>{item.caption}</p>
                  <small>{item.credit}</small>
                  {item.details?.length > 0 && (
                    <ul className="modal__item-details">
                      {item.details.map((detail) => <li key={detail}>{detail}</li>)}
                    </ul>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : content.src ? (
          <>
            <img src={content.src} alt={content.title} />
            <p>{content.caption}</p>
            <small>{content.credit}</small>
            {content.details?.length > 0 && (
              <section className="modal__details">
                <h4>Mission data</h4>
                <ul>
                  {content.details.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
              </section>
            )}
          </>
        ) : null}
        {sections.length > 0 && (
          <div className="modal__sections">
            {sections.map((section) => (
              <section className="modal__section" key={section.title}>
                {section.img && (
                  <figure className="modal__section-photo">
                    <img src={section.img} alt={section.title} loading="lazy" />
                    {section.credit && <small>{section.credit}</small>}
                  </figure>
                )}
                <h4>{section.title}</h4>
                {section.summary && <p className="modal__summary">{section.summary}</p>}
                <ul>
                  {section.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>
            ))}
          </div>
        )}
        <button className="btn-start btn-small" onClick={onClose}>Back to the story</button>
      </div>
    </div>
  );
}
