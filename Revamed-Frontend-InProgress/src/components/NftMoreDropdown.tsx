"use client";

import React, { FC, useState } from "react";
import NcDropDown, { NcDropDownItem } from "@/shared/NcDropDown/NcDropDown";
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";
import ModalReportItem from "./ModalReportItem";
import ModalTransferToken from "./ModalTransferToken";

export interface NftMoreDropdownProps {
  containerClassName?: string;
  iconClass?: string;
  dropdownPositon?: "up" | "down";
  actions?: NcDropDownItem[];
}

const actionsDefault: NftMoreDropdownProps["actions"] = [
  { id: "edit", name: "Change price", icon: "las la-dollar-sign" },
  { id: "transferToken", name: "Transfer token", icon: "las la-sync" },
  { id: "report", name: "Report abuse", icon: "las la-flag" },
  { id: "delete", name: "Delete item", icon: "las la-trash-alt" },
];

const NftMoreDropdown: FC<NftMoreDropdownProps> = ({
  containerClassName = "py-1.5 px-3 flex rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer",
  iconClass = "w-4 h-4 sm:h-5 sm:w-5",
  dropdownPositon = "down",
  actions = actionsDefault,
}) => {
  const [isEditting, setIsEditting] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTransfering, setIsTransfering] = useState(false);

  const openModalEdit = () => setIsEditting(true);
  const closeModalEdit = () => setIsEditting(false);

  const openModalReport = () => setIsReporting(true);
  const closeModalReport = () => setIsReporting(false);

  const openModalDelete = () => setIsDeleting(true);
  const closeModalDelete = () => setIsDeleting(false);

  const openModalTransferToken = () => setIsTransfering(true);
  const closeModalTransferToken = () => setIsTransfering(false);

  const hanldeClickDropDown = (item: NcDropDownItem) => {
    if (item.href) {
      return;
    }

    if (item.id === "edit") {
      return openModalEdit();
    }
    if (item.id === "report") {
      return openModalReport();
    }
    if (item.id === "delete") {
      return openModalDelete();
    }
    if (item.id === "transferToken") {
      return openModalTransferToken();
    }
    return;
  };

  const renderMenu = () => {
    return (
      <NcDropDown
        className={` ${containerClassName} `}
        iconClass={iconClass}
        data={actions}
        panelMenusClass={
          dropdownPositon === "up"
            ? "origin-bottom-right bottom-0 "
            : "origin-top-right !w-44 sm:!w-52"
        }
        onClick={hanldeClickDropDown}
      />
    );
  };

  return (
    <div className="">
      {renderMenu()}
      <ModalReportItem
        show={isReporting}
        onCloseModalReportItem={closeModalReport}
      />
      <ModalEdit show={isEditting} onCloseModalEdit={closeModalEdit} />

      <ModalDelete show={isDeleting} onCloseModalDelete={closeModalDelete} />
      <ModalTransferToken
        show={isTransfering}
        onCloseModalTransferToken={closeModalTransferToken}
      />
    </div>
  );
};

export default NftMoreDropdown;
