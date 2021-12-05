import React, { useCallback, useState, useMemo } from "react";
import { Heading, Modal, Button } from "react-bulma-components";
import Loading from "components/loading";
import TextField from "components/fields/textField";
import { PreventDefaultForm } from "utils/domEventHelpers";
import { Executive } from "types/db";
import { UpdateType } from "utils/firebase";
import { serverTimestamp } from "firebase/database";

interface Props {
  onSave: (updatedAdmin: Partial<UpdateType<Executive, "updatedAt">>) => void;
  onCancel: () => void;
  adminData: Executive;
  loading: boolean;
}

const EditAdminModal = ({
  onSave,
  onCancel,
  adminData,
  loading,
}: Props): React.ReactElement => {
  const [displayName, setDisplayName] = useState(adminData.displayName);
  const [title, setTitle] = useState(adminData.title);

  const sid = useMemo(() => adminData.sid as string, [adminData.sid]);

  const onReset = useCallback(() => {
    setDisplayName(adminData.displayName);
    setTitle(adminData.title);
  }, [adminData]);

  const onConfirm = useCallback(
    (updatedAdmin: Partial<UpdateType<Executive, "updatedAt">>) => {
      onSave(updatedAdmin);
    },
    [onSave]
  );

  return (
    <Modal show closeOnEsc={false} onClose={onCancel}>
      <Modal.Content className="has-background-white box">
        <PreventDefaultForm
          onSubmit={() =>
            onConfirm({ sid, displayName, title, updatedAt: serverTimestamp() })
          }
        >
          <>
            <Heading className="has-text-centered">Edit Admin</Heading>
            <TextField
              value={sid}
              pattern="^\d{10}$"
              label="Student ID"
              placeholder="Student ID"
              required
            />
            <TextField
              value={displayName}
              setValue={setDisplayName}
              label="Display Name"
              placeholder="Display Name"
              editable
            />
            <TextField
              value={title}
              setValue={setTitle}
              label="Title"
              placeholder="Title"
              editable
            />
            <div className="is-pulled-right buttons pt-4">
              <Button type="button" onClick={onReset} color="warning">
                Reset
              </Button>
              <Button type="submit" color="primary">
                Confirm
              </Button>
              <Button type="button" color="danger" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </>
        </PreventDefaultForm>
      </Modal.Content>
      <Loading loading={loading} />
    </Modal>
  );
};

export default EditAdminModal;