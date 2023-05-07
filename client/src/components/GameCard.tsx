const GameCard = () => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          <div className="carousel-item">
            <img
              src="https://img.itch.zone/aW1nLzExOTk4NTUxLnBuZw==/315x250%23c/Sc4OYp.png"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item active">
            <img
              src="https://img.itch.zone/aW1hZ2UvNTY0MjM4LzExOTk4Mjc4LnBuZw==/347x500/plFk8n.png"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.itch.zone/aW1hZ2UvNTY0MjM4LzExOTk4Mjk3LnBuZw==/347x500/3nA%2FTn.png"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="card-body text-start" style={{ padding: "2px" }}>
        <h6 className="card-title text-start">NIGHT OF THE CONSUMERS</h6>
        <p className="card-text text-start">
          <img
            src="https://itch.io/static/images/frog-gold.png"
            alt=""
            className="rounded-circle"
            style={{ width: "25px" }}
          />
          <a href="" className="text-decoration-none text-primary-emphasis">
            Game Creator name
          </a>
        </p>
        <div className="d-flex align-items-start" style={{ width: "28%" }}>
          <div className="card p-1 bg-light ">
            <h6
              className="text-muted mb-0 text-truncate"
              style={{ fontSize: "12px" }}
            >
              #Action
            </h6>
          </div>
        </div>
        <img style={{ width: "25px" }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAV1BMVEX///9/f398fHybm5uPj4+VlZWJiYl5eXl2dnbj4+PHx8erq6tzc3OoqKjl5eWBgYH4+PihoaG6urr5+fny8vLBwcGxsbHq6urOzs69vb20tLTc3Nyenp7ySRzOAAAD9ElEQVR4nO2dbXOqMBBGa6SA71ooWu3//50Xoq3YqxSzS2GZcz62nWf2SChJRrIvLwAAAAAAAAAAAAAAABDM/lBEUbHvu4xOyPaHY5SmiXMuWR77rkaZbXnlppM0SdzkQjoexWx9KF7jutxFcRQDtZSLJqXbDzlPUvRdnYxqWJ7vuTtyHvfad43B5NWw3DTJnQ2jvgsNYnZYRJsHw9K84fqwiJN2cuYMt+t5ESW/DkubhtvZfNHinjNqOJuv2t5z5gyz8srFy6ArN3zDvBqWLv05QRmHYe6HpfDKDdcwO8Yu/J4zYJhvEj23QRrGihdvkIaHVF2wR8Ptab6K3eep/rOp/iXsxzA/va/i85LHpavaLzoYpH9uWMrtIld/FKS1FWqsL/iXhtlpvovvrMSX6xEY+ntu+WCGUttmMGnoZyhJ0/Srts1gzXDbbvpVK8GSYSnXdiVuzrBciS/87ldACYM39CvxiWCbYeCG20XYStyM4d4FLgvMGAbPuKwYhi8LrBjugifNVgwjDNuUgKEwHkMMFUrAUBiPIYYKJWAojMcQQ4USMBTGY4ihQgkYCuMxxFChBAyF8RhiqFAChsJ4DDFUKAFDYTyGGCqUgKEwHkMMFUrAUBiPYTPhLxK4qcLH1CpexjH4dZ7k7Ttk1YFhLV7GfhlawjL/DpkFh7SKF/IW+NW99L0WslB/LegmXqpYfX/2WRJ3W0EREtI+Xsj+bTd9kt3HzzG0Pj4d0hQ/ikMxAAAA4E8Z/ZwmcF46vwlRn5d+KAqGri3qikNeW4SvD1Mj60PBGv/6KQ96jS/Yp9l9h3SyT/OpZCjYa+v4bXWtM/cwbFUChsJ4DDFUKAFDYTyGGCqUgKEwHkMMFUrAUBiPIYYKJWAojMcQQ4USMBTGY4ihQgkYCuMxxFChBAyF8RhiqFAChsJ4DDFUKAFDYbwMwVnQRgwF53kbMRScyW7FcD8JPVffimF4bwQzhqGdJi0ZnjW/epS0boVqzfBMqdm6z4xNw4qqyWabXkF2DT35+tJu83Fb6evL1iYNPdumlqm1L2LbNTxT9YC613ft+taHdcOKqo/X7QMlPV5/OwZDT9UK99J+2tWbA3bT/7C37vHlf9oi2uxueli+jsrwHvMu+pAOyrCTXrLDMuyiH/CwDLvo6Twwwxf9vtzDM/T43uqNzT2tG3qypsneKAzPVJO9sN0DK4YV+X+TvbEZevxk75kOp+YMPdkTXWptGnoy/0B5epPEGv6B0rh7YN3Q43f2Gh8oaifS9Ur13Hw02VN7W713HnUBT8d13Jff2buZ7NU3SUbDdbLn3LL4/e+tUj03o8W67zIAAAAAAAAAAAAAAACe4x/Y5G4qSLANiAAAAABJRU5ErkJggg==" alt="" />
      </div>

    </div>

  );

};

export default GameCard;
