// nested array of objects
// we are using recursion of DSA to show all comments

const commentsData = [
  {
    name: "Jahnabi Sarma",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, beatae?",
    replies: [
      {
        name: "Manash Sarma",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, beatae?",
        replies: [
          {
            name: "Jahnabi Sarma",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, beatae?",
            replies: [],
          },
        ],
      },
    ],
  },

  {
    name: "Basanta Sharma",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, beatae?",
    replies: [
      {
        name: "Manash Sarma",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, beatae?",
        replies: [
          {
            name: "Jahnabi Sarma",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, beatae?",
            replies: [],
          },
        ],
      },
    ],
  },
];

const Comment = ({ data }) => {
  const { name, text } = data;
  return (
    <div className="flex shadow-sm bg-gray-100 p-2 rounded-lg my-2">
      <img
        className="h-8"
        src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        alt="user-icon"
      />
      <div className="pl-2">
        <p className="font-bold">{name}</p>
        <p>{text}</p>
      </div>
    </div>
  );
};

const CommentsList = ({ comments }) => {
  // Disclaimer: Don't use indexes as keys
  return comments.map((comment, index) => (
    <div key={index}>
      <Comment data={comment} />
      <div className="pl-5 ml-5 border border-l-black">
        <CommentsList comments={comment.replies} />
      </div>
    </div>
  ));
};

const CommentsContainer = () => {
  return (
    <div className="m-5 p-2">
      <h1 className="text-2xl font-bold">Comments: </h1>
      <CommentsList comments={commentsData} />
    </div>
  );
};

export default CommentsContainer;
