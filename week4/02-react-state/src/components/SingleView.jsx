const SingleView = (props) => {
  const {item, setSelectedItem} = props;
  return (
    <dialog open>
      <h3>{item.title}</h3>

      {/* Media content */}
      {item.media_type.startsWith('image') ? (
        <img src={item.filename} alt={item.title} style={{maxWidth: '100%'}} />
      ) : (
        <video controls width="100%">
          <source src={item.filename} type={item.media_type} />
        </video>
      )}

      <p>{item.description}</p>

      <button onClick={() => setSelectedItem(null)}>Close</button>
    </dialog>
  );
};

export default SingleView;
