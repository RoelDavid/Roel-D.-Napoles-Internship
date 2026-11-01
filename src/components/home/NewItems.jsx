import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useCountdown from "../timer/timer.jsx";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton.jsx";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const countdowns = useCountdown(newItems);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNewItems (){
      const newItemsData = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
      );
      setNewItems(newItemsData.data);
      setLoading(false);
    }
    fetchNewItems();
    }, [])

    const carouselSettings = {
      className: "owl-theme",
      items: 4,
      margin: 10,
      loop: true,
      nav: true,
      dots: false,
      responsive: {
        0: { items: 1 },
        576: { items: 2 },
        768: { items: 3 },
        992: { items: 4 },
      },
    };
  
  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <OwlCarousel className="owl-theme" {...carouselSettings}>
            {loading
    ? [1, 2, 3, 4].map((item) => (
        <div key={item}>
          <div className="nft__item">
            <div className="author_list_pp">
              <Skeleton
                width="50px"
                height="50px"
                borderRadius="50%"
              />
            </div>

            <div className="nft__item_wrap">
              <Skeleton
                width="100%"
                height="200px"
                borderRadius="8px"
              />
            </div>

            <div className="nft__item_info">
              <Skeleton
                width="140px"
                height="18px"
                borderRadius="4px"
              />
            </div>
          </div>
        </div>
      )):newItems.map((item) => (
              <div key={item.id}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link
                      to={`/author/${item.authorId}`}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Creator: Monica Lucas"
                    >
                      <img className="lazy" src={item.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  {item.expiryDate !== null && (
                    <div className="de_countdown">{countdowns[item.id]}</div>
                  )}

                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a href="">
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>

                    <Link to={`/item-details/${item.nftId}`}>
                      <img
                        src={item.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to={`/item-details/${item.nftId}`}>
                      <h4>{item.title}</h4>
                    </Link>
                    <div className="nft__item_price">{item.price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{item.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
