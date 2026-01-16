import {
  forwardRef,
  type MouseEventHandler,
  type ReactElement,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

interface CopyIconRef {
  onClick: () => void;
}

const CopyIcon = forwardRef<CopyIconRef>((_props, ref) => {
  const [enabled, setEnabled] = useState(false);

  useImperativeHandle(ref, () => ({
    onClick: () => {
      setEnabled(true);
      setTimeout(() => setEnabled(false), 2000);
    },
  }));

  return (
    <>
      {enabled ? (
        <i className="bi bi-clipboard2-check-fill text-success" />
      ) : (
        <i className="bi bi-clipboard2" />
      )}
    </>
  );
});

export type BaseComponent = React.ComponentType<{
  children: ReactElement;
  onClick: MouseEventHandler<any>;
}>;

interface CopyButtonProps {
  baseComponent: BaseComponent;
}

const CopyButton: React.FC<CopyButtonProps> = ({ baseComponent }) => {
  const copyIconRef = useRef<CopyIconRef>({ onClick: () => {} });

  const Comp = baseComponent;

  return (
    <>
      <Comp onClick={() => copyIconRef.current.onClick()}>
        <CopyIcon ref={copyIconRef} />
      </Comp>
    </>
  );
};

export default CopyButton;
