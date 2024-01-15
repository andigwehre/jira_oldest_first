// content-script.js
const actionOrder = 'asc';

if (actionOrder) {
  const message = {
      type: 'forwardVariable',
          data: actionOrder
	    };
	      window.postMessage(message, '*');
	      }



window.alert("actionOrder= "+actionOrder)
