import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContainer, DialogHeader, DialogContent, DialogFooter } from './styles';
import { postSendRequest } from '../../redux/actions/contact.action';
import { fieldValidation } from '../../validation/field.validation';

const AddContact = ({ open, setOpenDialogAddContact }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClose = () => {
    setOpenDialogAddContact(false);
  };

  const sendRequestHandler = async (dataHookForm) => {
    dispatch(postSendRequest({ dataHookForm }));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContainer className="create-channel">
        <DialogHeader>
          <span>Add Contact</span>
        </DialogHeader>
        <DialogContent>
          <label>Contact</label>
          <input
            {...register('contactName', { ...fieldValidation.addContact })}
            type="text"
            placeholder="Type email or user's ID..."
          />
          {errors?.contactName?.message && <p className="dialog-error-msg">* {errors?.contactName?.message}</p>}
        </DialogContent>
        <DialogFooter>
          <button onClick={handleSubmit(sendRequestHandler)}>Send Request</button>
        </DialogFooter>
      </DialogContainer>
    </Dialog>
  );
};

export default AddContact;
