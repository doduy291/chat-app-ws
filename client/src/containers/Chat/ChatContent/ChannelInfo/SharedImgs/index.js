import React from 'react';
import { KeyboardArrowRight } from '@mui/icons-material';
import {
  SharedImgsList,
  SharedImgsItem,
  AccordionCustom,
  AccordionCustomSummary,
  AccordionCustomDetails,
} from '../styles';
import { imgOptimize } from '../../../../../utils/cloudinaryImgOptimize';

const SharedImages = ({ detailChannel }) => {
  return (
    <div className="shared-imgs">
      <AccordionCustom className="accordion-custom">
        <AccordionCustomSummary className="accordion-custom__summary" expandIcon={<KeyboardArrowRight />}>
          Shared Images
        </AccordionCustomSummary>
        <AccordionCustomDetails className="accordion-custom__details">
          <SharedImgsList className="shared-imgs__list">
            {detailChannel.sharedImages.reverse().map((item, i) => (
              <SharedImgsItem className="shared-imgs__item" key={i}>
                <div className="img-item-wrapper">
                  <div className="img-item-container">
                    <a href={item.url} target="_blank" rel="noreferrer">
                      <img src={imgOptimize(item.url, 'sharedImg')} alt="" />
                    </a>
                  </div>
                </div>
              </SharedImgsItem>
            ))}
          </SharedImgsList>
        </AccordionCustomDetails>
      </AccordionCustom>
    </div>
  );
};

export default SharedImages;
