import React from "react";

function studentChangePassword({
  nowPasswordOpen,
  nowPasswordError,
  nowPasswordErrorRef,
  nowPassword,
  newNowPasswordOpen,
  newPassword,
  newPasswordErrorRef,
  newPasswordError,
  repeatNewPassword,
  repeatNewPasswordError,
  repeatNewPasswordErrorRef,
  repeatNewPasswordOpen,
  eyeOpenCondition,
  onChangeNowPassword,
  onChangeSetNewPassword,
  secondEyeOpenCondition,
  repeatNewPasswordProps,
  repeatNewPasswordCondition
}) {
  return (
    <>
      <div className="form__div">
        <input
          type={nowPasswordOpen ? "text" : "password"}
          className={nowPasswordError ? "err form__input" : "form__input"}
          value={nowPassword}
          ref={nowPasswordErrorRef}
          onChange={onChangeNowPassword}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          placeholder=" "
        />
        <label
          for=""
          className={nowPasswordError ? "err_lab form__label" : "form__label"}
        >
          ახლანდელი პაროლი
        </label>
        {nowPassword.length > 0 && (
          <i
            class="fas fa-eye sto"
            onClick={eyeOpenCondition}
          ></i>
        )}
      </div>
      <div className="form__div">
        <input
          type={newNowPasswordOpen ? "text" : "password"}
          className={newPasswordError ? "err form__input" : "form__input"}
          value={newPassword}
          ref={newPasswordErrorRef}
          onChange={onChangeSetNewPassword}
          autoCorrect="off"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
          placeholder=" "
        />
        <label
          for=""
          className={newPasswordError ? "err_lab form__label" : "form__label"}
        >
          ახალი პაროლი
        </label>
        {newPassword.length > 0 && (
          <i
            class="fas fa-eye sto"
            onClick={secondEyeOpenCondition}
          ></i>
        )}
      </div>
      <div className="form__div">
        <input
          type={repeatNewPasswordOpen ? "text" : "password"}
          value={repeatNewPassword}
          onChange={repeatNewPasswordProps}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          ref={repeatNewPasswordErrorRef}
          spellCheck="false"
          className={repeatNewPasswordError ? "err form__input" : "form__input"}
          placeholder=" "
        />
        <label
          for=""
          className={
            repeatNewPasswordError ? "err_lab form__label" : "form__label"
          }
        >
          გაიმეორეთ ახალი პაროლი
        </label>
        {repeatNewPassword.length > 0 && (
          <i
            class="fas fa-eye sto"
            onClick={repeatNewPasswordCondition}
          ></i>
        )}
      </div>
    </>
  );
}

export default studentChangePassword;