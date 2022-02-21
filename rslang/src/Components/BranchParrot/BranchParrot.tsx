import './BranchParrot.scss';

const BranchParrot = () => {
  return (
    <div className="games-parrots-wrapper">
      <div
        className="games-parrots-branch"
        style={{
          backgroundImage: `url(/assets/img/branch.png)`,
        }}
      />
    </div>
  );
};

export default BranchParrot;
