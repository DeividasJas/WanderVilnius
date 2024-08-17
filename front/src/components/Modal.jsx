import { registerUserToTour } from '../services/post.mjs';
import { Toaster, toast } from 'sonner';
function Modal({ eventTime, eventTitle, eventTime_id, tour_id }) {
  const userRegistrationForTour = async () => {
    const response = await registerUserToTour({
      tour_id: tour_id,
      tour_time_id: eventTime_id,
    });
    console.log(response);
    if(response.status === 400){
      toast.error(`${response.data.message}`)
    }
    if(response.status === 201){
      toast.success(`Successfully registered to '${eventTitle}' tour`)
    }

  };
  return (
    <>
      <dialog id='my_modal_5' className='modal modal-bottom sm:modal-middle'>
        <div className='modal-box'>
          <h3 className='font-bold'>Would you like to register to a tour?</h3>
          <p className='py-4 font-bold text-lg'>{eventTitle}</p>
          <p>{eventTime}</p>
          <div className='modal-action'>
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <div className='flex gap-2'>
                <button className='btn btn-error'>Cancel</button>
                <button
                  className='btn btn-success font-bold'
                  onClick={() => userRegistrationForTour()}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
      <Toaster richColors/>
    </>
  );
}

export default Modal;
