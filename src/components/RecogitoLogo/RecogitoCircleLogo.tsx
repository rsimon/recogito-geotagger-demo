export interface RecogitoCircleLogoProps {
  
  className?: string;

  height?: number;

  width?: number;

}

/**
 * Icon from https://www.svgrepo.com/svg/347710/comment-discussion
 * MIT-Licensed
 */
export const RecogitoCircleLogo = (props: RecogitoCircleLogoProps) => {

  const height = props.height || 40;

  const width = props.width || 40;

  return (
    <svg 
      fill="#ffffff" 
      width={`${width}px`}
      height={`${height}px`}
      className={props.className}
      viewBox="0.406 0.278 23.4 23.4" xmlns="http://www.w3.org/2000/svg">
      <path d="M 23.806 11.978 C 23.806 18.44 18.568 23.678 12.106 23.678 C 5.645 23.678 0.406 18.44 0.406 11.978 C 0.406 5.516 5.645 0.278 12.106 0.278 C 18.568 0.278 23.806 5.516 23.806 11.978 Z M 6.299 6.02 C 5.757 6.02 5.318 6.459 5.318 7.001 L 5.318 12.323 C 5.318 12.865 5.757 13.305 6.299 13.305 L 7 13.305 L 7 14.168 C 7 14.798 7.679 15.19 8.224 14.875 C 8.286 14.84 8.342 14.796 8.392 14.746 L 9.834 13.305 L 13.303 13.305 C 13.843 13.305 14.282 12.865 14.282 12.323 L 14.282 7.001 C 14.282 6.459 13.843 6.02 13.303 6.02 Z M 6.159 7.001 C 6.159 6.924 6.222 6.861 6.299 6.861 L 13.303 6.861 C 13.38 6.861 13.442 6.924 13.442 7.001 L 13.442 12.323 C 13.442 12.401 13.38 12.464 13.303 12.464 L 9.661 12.464 C 9.548 12.464 9.442 12.508 9.364 12.587 L 7.839 14.111 L 7.839 12.884 C 7.839 12.653 7.652 12.464 7.419 12.464 L 6.299 12.464 C 6.222 12.464 6.159 12.401 6.159 12.323 Z M 17.924 15.685 C 17.924 15.762 17.862 15.825 17.785 15.825 L 16.663 15.825 C 16.432 15.825 16.244 16.014 16.244 16.246 L 16.244 17.473 L 14.719 15.949 C 14.641 15.87 14.535 15.825 14.422 15.825 L 11.341 15.825 C 11.264 15.825 11.201 15.762 11.201 15.685 L 11.201 14.864 C 11.201 14.714 11.121 14.576 10.991 14.501 C 10.711 14.34 10.36 14.541 10.36 14.864 L 10.36 15.685 C 10.36 16.227 10.799 16.666 11.341 16.666 L 14.249 16.666 L 15.691 18.107 C 15.741 18.158 15.797 18.201 15.86 18.238 C 16.404 18.552 17.084 18.159 17.084 17.53 L 17.084 16.666 L 17.785 16.666 C 18.326 16.666 18.765 16.227 18.765 15.685 L 18.765 10.363 C 18.765 9.821 18.326 9.382 17.785 9.382 L 15.824 9.382 C 15.673 9.382 15.534 9.462 15.46 9.593 C 15.298 9.873 15.5 10.223 15.824 10.223 L 17.785 10.223 C 17.862 10.223 17.924 10.286 17.924 10.363 Z" />
    </svg>
  )

}
