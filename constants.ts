import { TemplateConfig } from './types';

export const ASSETS = {
  BACKGROUND: 'https://lh7-rt.googleusercontent.com/docsz/AD_4nXd2eQD8Su9IFFnWhgDe3vdaIEx3gUKtyJ0Pl2fOH90dKgl5bJpmi1uu6kkTZErYqlDTfyrDsDcLexFjiWxOmRCbNbFdNynT886sVslO4NnerWxD7ClhV1iFjCIZh4-3-IQ?key=zafq-61zPIz9lcO-V90RTQ',
  TITLE: 'https://lh7-rt.googleusercontent.com/docsz/AD_4nXchNUplkssq5wh7PizA0xmNvFW7Dczo1Bmj54kjSfw1vhbR3HYw6biz8wFhcIsBr6D2Gwmc5DU6nscwTt_Mu65qEz6vLkIEftGCZOXAHghQBopKIFVG0DLRsWX6Qerw-xc?key=zafq-61zPIz9lcO-V90RTQ',
  MEMBER_CARD: 'https://lh7-rt.googleusercontent.com/docsz/AD_4nXdtY899FPvBdFJocQ3uyQAjf2px0LNGSGSGSLfACH2ZABQEGAEN0U7UABk5OsnYPvstBwgszHAYXCrGDdzGWKk0NgTjsCq7kA8W3UKaqGN20tFj-GevbE36qjx06RzbT9g?key=zafq-61zPIz9lcO-V90RTQ',
  RECEIPT: 'https://lh7-rt.googleusercontent.com/docsz/AD_4nXekTowhpgItBwGzWd0CSraML4JY32f-3bb4eBOPx4s2lb6B8kRQ3jV5-R-mCLE_TDqcWj-s92pRdUnDooC6X5p2QD3kPzX2dx5yy1DLxHjw8MvK1ElKnvQRzxkztBe_uQ?key=zafq-61zPIz9lcO-V90RTQ',
  SALE: 'https://lh7-rt.googleusercontent.com/docsz/AD_4nXeSZ0KXxNneMPzOuYjtUTH9UDKn71R_Yi0AvoxAFny9gX-VBVDNyGKQ9xjRidlevy8sP42HVgY1uxuM_jdZG2SHOeCGC0F8e2XtssKfRAm-ohu-ArHZqO4rONfgBz1joTU?key=zafq-61zPIz9lcO-V90RTQ',
  HOT_ITEMS: 'https://lh7-rt.googleusercontent.com/docsz/AD_4nXcL0ZFWfE7PL4A0_z6GO8hxPQtOg4PpWMpjZPXGA3SMaeLSw-LjprsrXGcwkWwGVP9D1I2C7JtN4ueXytLXY7pjeGQ1MH_iGEeZIhZB0MQqY52r4NAuBPhcsne6AwxU6NE?key=zafq-61zPIz9lcO-V90RTQ',
  CASHIER: 'https://lh7-rt.googleusercontent.com/docsz/AD_4nXfji1SHjORZM5nR8AjVWvazS1jiqbP2WFCuecbtRzntVL-BkX_v7UegSercOPWDQrg_28dl7w82spW3KCSBL-xwrBZWn8RnDKgpQMUUTXMTFxqI738U6pZ0Hd7yiYiZ7p4?key=zafq-61zPIz9lcO-V90RTQ',
  THANK_YOU: 'https://lh7-rt.googleusercontent.com/docsz/AD_4nXeMmpgqpi0llwwXPREy3hoGm3yynP18GGgbQMZKDy_mENd0nFGjaAW1QR_nYK0uHACxJrwW-S5ntLkLdDwdPKG7DFtYl3To8TBoOvz_RRENvU8MFVvBaWUpQNVNThzrc78?key=zafq-61zPIz9lcO-V90RTQ',
  RESIGNATION: 'https://lh7-rt.googleusercontent.com/docsz/AD_4nXdvQFR4eNTTIjyIlY8EhDK9HvtT7s_SrxQun4JGn7RquH3QhnaaX5AHJYbRkcgqBjc3O0YdfuTKhsay2RnfZKqlwzEpEL0z4I0rFjgWiYjoyrStcLSnL620bG5eQJ8bNWA?key=zafq-61zPIz9lcO-V90RTQ',
  BUTTON: 'https://lh7-rt.googleusercontent.com/docsz/AD_4nXdQDRlG0yd49J-Y_IlSJ8UyladYgeQoAnLWCQXs4WL9I9XwFH_84bBPicZxgKfntQmnGrpkDN5YQ8Kc3WPvu9ajZJNiKjyCpBERTaDvqFBe_oFC7UMlTRehymZly_gcjQ?key=zafq-61zPIz9lcO-V90RTQ',
  MAIN_VISUAL: 'https://lh7-rt.googleusercontent.com/docsz/AD_4nXdGPq5zIWqpS02unIgmLS7lIDEC-kn5x5y1DpM9z5DlKHNHeeUMkwhYr0llPcckAPSIQYSA19HjyJMr1N7ey_sxI4t2bRoSxtYLatEF6pbpDpdjpmB2yiPsuQLbRYy9cv4?key=zafq-61zPIz9lcO-V90RTQ'
};

export const TEMPLATES: TemplateConfig[] = [
  {
    id: 'member-card',
    name: '會員卡',
    imageUrl: ASSETS.MEMBER_CARD,
    photoArea: {
      x: 14, // Left side
      y: 53,
      width: 27,
      height: 31,
      rotation: 0
    },
    textArea: {
      x: 48, // Right side
      y: 62,
      width: 40,
      height: 10,
      fontSize: 24,
      color: '#000000',
      align: 'left',
      defaultText: '王小明'
    }
  },
  {
    id: 'resignation',
    name: '離職申請書',
    imageUrl: ASSETS.RESIGNATION,
    photoArea: {
      x: 65,
      y: 20,
      width: 30,
      height: 30,
    },
    textArea: {
      x: 10,
      y: 50,
      width: 80,
      height: 10,
      fontSize: 24,
      color: '#000000',
      align: 'center',
      defaultText: '准許放飛'
    }
  }
];