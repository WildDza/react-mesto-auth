import React from "react";
import { useNavigate } from "react-router-dom";
import iconSuccess from "../images/iconSuccess.png";
import iconError from "../images/iconError.png";

function InfoTooltip(props) {
  const navigate = useNavigate();

  function handleClose() {
    props.onClose();
    props.setTooltipInfo({ success: false });
    navigate("/sign-in", { replace: true });
  }

  return (
    <div className={`popup popup__info-tooltip ${props.isOpen ? "popup_show" : ""}`}>
      <div className="popup__content">
        <button
          className="popup__close-icon"
          type="button"
          aria-label="Иконка закрытия попапа"
          onClick={props.tooltipInfo.success ? handleClose : props.onClose}
        />
        <img className="popup__regstatus" src={props.tooltipInfo.success ? iconSuccess : iconError} alt="Иконка статуса" />
        <h3 className="popup__regstatus-text">{props.tooltipInfo.text}</h3>
      </div>
    </div>
  );
}
export default InfoTooltip;
