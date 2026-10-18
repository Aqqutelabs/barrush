const trackerForm=document.querySelector('[data-tracker-form]');
const trackerStatus=document.querySelector('[data-tracker-status]');

trackerForm?.addEventListener('submit',event=>{
  event.preventDefault();
  const field=trackerForm.elements.reference;
  const reference=field.value.trim().toUpperCase();

  if(reference.length<5){
    field.setCustomValidity('Enter a valid tracking reference.');
    field.reportValidity();
    return;
  }

  field.setCustomValidity('');
  field.value=reference;
  trackerStatus.hidden=false;
  trackerStatus.className='tracker-status is-error';
  trackerStatus.innerHTML='<strong>Reference not found</strong><p>Check the reference and try again, or call our operations team for help.</p>';
});

document.querySelector('#tracking-reference')?.addEventListener('input',event=>{
  event.currentTarget.setCustomValidity('');
  trackerStatus.hidden=true;
});
