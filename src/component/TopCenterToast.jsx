import React, { useImperativeHandle, forwardRef, useRef } from 'react';
import { Toast } from 'primereact/toast';

const TopCenterToast = forwardRef((_, ref) => {
  const toast = useRef(null);

  useImperativeHandle(ref, () => ({
    showToast(severity, label) {
      toast.current.show({
        severity,
        summary: label,
        detail: label,
        life: 3000,
      });
    },
  }));

  return <Toast ref={toast} position="top-center" />;
});

export default TopCenterToast;
