import Button from "./Button";

const list = [
  "All",
  "Music",
  "Drama",
  "Comedy",
  "Thrillers",
  "Live",
  "Romantic",
  "Mixes",
];

const ButtonList = () => {
  return (
    <div className="flex">
      {list.map((item) => (
        <Button key={item} name={item} />
      ))}
    </div>
  );
};

export default ButtonList;
