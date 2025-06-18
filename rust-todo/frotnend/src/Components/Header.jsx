import React from "react";

const Header = () => {
  return (
    <div>
      <div className="bg-gray-500/20 py-4 w-filt mx-7 my-7 flex justify-between rounded-2xl">
        <div className="flex gap-10 mx-3">
          <img
            src="https://www.svgrepo.com/show/228132/network-share.svg"
            alt=""
            width={40}
          />
          <img
            src="https://www.svgrepo.com/show/228122/hierarchical-structure-organization.svg"
            alt=""
            width={40}
          />
        </div>
        <div className="font-bold uppercase text-2xl">Todo Application</div>
        <div className="flex gap-10 mx-3">
          <img
            src="https://www.svgrepo.com/show/283117/studying-exam.svg"
            alt=""
            width={40}
          />
          <img
            src="https://www.svgrepo.com/show/530400/browse.svg"
            alt=""
            width={40}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
