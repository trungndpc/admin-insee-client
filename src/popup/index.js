import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "./styles.scss";

const owlClass = "popup";


export function AreYouSurePopup({open, onCloseModal, onAgree }) {
  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      center
      showCloseIcon={false}
      styles={{
        modal: {
          background: "rgba(242, 242, 242, 0.94)",
          backdropFilter: "blur(54.3656px)",
          borderRadius: "14px",
          padding: "0",
          maxWidth: "80%"
        },
      }}
    >
      <div className={owlClass} style={{minWidth: '300px'}}>
        <div className={`${owlClass}__wrapper`}>
          <div className={`${owlClass}__wrapper__title`}>Anh/chị có chắc?</div>
        </div>
        <div className={`${owlClass}__group-btn`}>
          <div
            className={`${owlClass}__group-btn__item left`}
            onClick={onCloseModal}
          >
            Không
          </div>
          <div
            className={`${owlClass}__group-btn__item right`}
            onClick={onAgree}
          >
            Có
          </div>
        </div>
      </div>
    </Modal>
  );
}



export function ConfirmPhonePopup({ phone, storeName, open, onCloseModal, onAgree }) {
  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      center
      showCloseIcon={false}
      styles={{
        modal: {
          background: "rgba(242, 242, 242, 0.94)",
          backdropFilter: "blur(54.3656px)",
          borderRadius: "14px",
          padding: "0",
          maxWidth: "80%"
        },
      }}
    >
      <div className={owlClass}>
        <div className={`${owlClass}__wrapper`}>
          <div className={`${owlClass}__wrapper__title`}>Anh/chị có chắc?</div>
          <p className={`${owlClass}__wrapper__desc`}>
            Số điện thoại ({phone}) là của cửa hàng {storeName} ?
          </p>
        </div>
        <div className={`${owlClass}__group-btn`}>
          <div
            className={`${owlClass}__group-btn__item left`}
            onClick={onCloseModal}
          >
            Không
          </div>
          <div
            className={`${owlClass}__group-btn__item right`}
            onClick={onAgree}
          >
            Có
          </div>
        </div>
      </div>
    </Modal>
  );
}



export function ErrorPopup({ open, onCloseModal }) {
  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      center
      showCloseIcon={false}
      styles={{
        modal: {
          background: "rgba(242, 242, 242, 0.94)",
          backdropFilter: "blur(54.3656px)",
          borderRadius: "14px",
          padding: "0",
          maxWidth: "80%"
        },
      }}
    >
      <div className={owlClass}>
        <div className={`${owlClass}__wrapper`}>
          <div className={`${owlClass}__wrapper__title`}>Lỗi</div>
          <p className={`${owlClass}__wrapper__desc`}>
            Anh/chị vui lòng thử lại sau
          </p>
        </div>
        <div className={`${owlClass}__group-btn`}>
          <div
            className={`${owlClass}__group-btn__item right`}
            onClick={onCloseModal}
          >
            OK
          </div>
        </div>
      </div>
    </Modal>
  );
}
