import { useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import EnterChatRoom from "../modal/EnterChatRoom";
import { Notification } from "../../mocks/mockType";

const NotificationCard = (): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const [clickedData, setClickedData] = useState<number | null>(null);

  const { data: notificationData, isError } = useFetchData(
    "/notificationData",
    ["notificationData"]
  );

  if (isError) {
    console.log("데이터 불러오기 실패");
  }

  const openModal = (data: Notification) => {
    setShowModal(true);
    setClickedData(data.postId);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    setClickedData(null);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <>
        {notificationData.map((data: Notification) => (
          <div key={data.notificationId}>
            <div className="flex justify-between pt-8 mb-4">
              <div>{data.createdDate}</div>
              <div>
                <button>삭제</button>
              </div>
            </div>
            <div
              tabIndex={0}
              onClick={() => openModal(data)}
              className={`flex flex-col md:flex-row items-center w-full min-h-[96px] p-5 mb-8 bg-white rounded-2xl shadow-md cursor-pointer text-center ${
                data.checked ? "opacity-50" : ""
              }`}
            >
              <span className="text-lg font-semibold mr-3">
                "{data.postTitle}"
              </span>
              <span className="text-sm mt-1.5 md:mt-0">
                투표글의 채팅방이 개설되었어요.
              </span>
            </div>
          </div>
        ))}
      </>
      {showModal ? (
        <EnterChatRoom postId={clickedData} closeModal={closeModal} />
      ) : null}
    </>
  );
};

export default NotificationCard;