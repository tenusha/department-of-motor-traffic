import React from 'react';
import {Image, StyleSheet, View, AsyncStorage, ScrollView, ToastAndroid, Text} from 'react-native';
import MaterialButtonPrimary1 from "./login_symbols/MaterialButtonPrimary1";
import MaterialButtonViolet from "./login_symbols/MaterialButtonViolet";
import MaterialCheckboxWithLabel1 from "./login_symbols/MaterialCheckboxWithLabel1";
import MaterialButtonWithVioletText1 from "./login_symbols/MaterialButtonWithVioletText1";
import LoginTextBox from "./login_symbols/LoginTextBox";
import LoginHeader from "./login_symbols/LoginHeader";
import {registerForPushNotificationsAsync} from "./functions/DmtNotification";
import configs from "../config";
import {Divider, SocialIcon} from "react-native-elements";

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Login',
        drawerIcon: (
            <Image source={require('../assets/icons/login_black.png')} style={{width: 24, height: 24}}/>
        )
    };

    state = {
        email: '',
        password: '',
        remember: false
    }

    handleChange = (name, value) => {
        this.setState({[name]: value})
    }

    handleSubmit = async () => {
        // TODO
        if (this.state.email && this.state.password) {
            const user = {
                id: "1",
                fname: "Tenusha",
                lname: "Guruge",
                email: "tenusha@gmail.com",
                profilePic: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxQTEhUUExMWFhUVGSAbGRUVGRscIRsWIB0iIiAdHx8kKDQsJCYxJx8fLTstMTMuMDAwIys9QD8uNzQ5MC4BCgoKDg0OFRAQFSsZFRkrKys3NzcrKzcrNystLSsrNzcwLS0rNysuLS0zNysyKy03KysrKystKysrKysrKysrK//AABEIAMgAyAMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAFBgMEAAIHAQj/xAA8EAACAQIEBAQEAwgBBQADAAABAhEAAwQSITEFQVFhBhMicTKBkaEHQrEUI1JicsHR4fAVJDOC8VOSov/EABkBAAMBAQEAAAAAAAAAAAAAAAECAwQABf/EACQRAAICAgICAgMBAQAAAAAAAAABAhEDIRIxBEETIjJRYYEU/9oADAMBAAIRAxEAPwBixeLVGIuZb+jBFyhfUsk5iQPh+hJqDA21bDXbmilWUZ0A0kQd5EcjVW5w8MLa+aqgkSqyAkyfURMzp96N8MIs2LisqqQ+Y2gZ/cj0mevMmsRHiULnDoW24uHWCLirAVl/KQNx+mvI0wcHuNmNt02UyROUrvCn6HrpVLh+GtjMlp1ZCcypm+IHYgzIP2NFrdjIylpm4FBjnCwQRyI60tWzoo2xGFcrlUwzkMzEn1KpAiesRqKQ+MSj5fUBmk9Ylon7V0xx15HSNI+dBfEPDPPA9OuxIAzRHUnbnVo3Q8oWJnh7GHzmUhYuWs8HaQBB+v0rbiWJdwFfQrI7zzJ+lS2eE5b6CDmINuNdE1k/OR2HWr9jw9cvtJYJlEEkEz7d6MaTJtPoALg8/qGvWN6K8MZUVg5hiBlJED2JO3WaO2vDllFBF4hhuxIifbl9aC8TRfMg7g/GoMEj+HlJ6GqWnoHBnuFxpYXBmBJW4JUDIYQ7GdfpRDxHinS6YWclhCCpC+stqAY0Gk0qcDuJZZmuWwgObVh/EpGUkflkii/FeOJe8wM8Eqi6LI0Mk6e9coNoeK0I/AcPJYbKVjNmKkGZ0H59J0NF8ZbBQKp9YgcobeSOn+6jtYEK65MpWNT89/7VtxDCZ3DkRBkZI0gaj2qriKolrE4HMySw8oEZ2J311Hf/AFTPwGyGS9etg5nvqNDByBhlU9ARM9NKC4qwZUES2VYRjoknMJPL0wT71e4VxVbSOtv94HuaZhl0Uf8AkAjQFmMDoN6z9OwtUy3jsCL1+6wEgXsjox12kMpGw0OlMJXTyWuKWYBlBaSwXcbdgaW+HWFUXLlzP5iXRORjmAcabfF6hI+dMOFw9i/5dwZma2TlY6MJGqmI+lCC2NFCr/1Dz7zjIbZVijwfSxAOs75gOXQ01eJURxh7jMU1jMO6gwfeKQfDLO+OxCNB8xyx2iQxWZHaa6H4qsBsK4mMgBUjkRoCe3XtRUfsw+mALOFS6rMTLBjBefUkwNOW1B+J+Hz5T3W9IUgW0gfEx5/KinBbxF1c7uUKiYOsj4QTyGp1G81Nx+2W/MSoOk9Tr9hVYPg9mZxsQuN2osJrIVog9x+X6Ua8J4zzQSCBeAkyf/Ko/NH8Y0nrINRcew84ZgBtrPsf9UF8ONF1CDDZoYHQHT0sPfVT7g0Jy9hho6tj8IFJCrlEemNtpM/MmsrOMYsFBBb4ZleQg8+fSsrI22UF7F4d7fxHOlwDMyHKWe5y6wMvXnV3DWLts+sqpuKZmSAf5o9hJnYxyoJxHEW7vwXmCFxktplWVJEsRqZjMJaBtRcW1UscrtleB6dcpWGKcuhg85oPbKUE8PhlazmFvynUaKu6zuJG6nerOHxAa0bhbM6egE7rrsfpvzFVeD8UzhgrhkTQOIBGmgI5Ea+9WLaZLWcBBmUFgZGu/wDc6d6rFXtBSLGBx7NAdGVvb7zV1u9I/wD1oWGRGuBBmJZyGM9NB9/amY8Vt+WXR1uRl0XWZ2inUq7CnZZCbesSNJgTHQVDhrTJm3EydSDP02r2xj7bDRhmj4YJI15ilfxb4q/ZWby3IZh8Lahf5gvWlaUqoLRH4i8S+QGMPBbkoAB7Hr8tZpIx3HndZUmBqADlPciOdBOIcbe8SXbNO8jv2qraEbEgcta1YsaitnF/EcTOozlgx0JrXB8QhyDsZkHoaHvbB0OkHlXqiDLKCp0zD/m9WODbYpoZNZUSvKR/sD7VNbxrIqGTJEyPeR/eflQthIygyRqjTr7VqL/o15AnT3Ej9aNnUN9jxE95gXCkMfWI+JgZlgPpRnguLQvebPmv3ICqY23IE6dBHbtXPcPfMrcWROrDuND9tat38WVfsdQecb79RUpY00c1Z1bhtg3VvW3RAz2wCUM6gnUwNCCZo3gLRRANydyI3HP259poB4P4mt/D5SyqUIWFXSInbbUdedG7PE7bnLaJMaGFOh6bRNZk+OmdVCX4fwrJiVunQXLmUpEb3G1PzWuiYkEo8GDlMHppQHj+F89Qi3QHW6rSDBVQwzD6E1NxLjKajMVIk6cuhNJ8iVi8kkC+DYQ3bbgSgZtRvkiCQI2Gvw9xVLhfrzguQVMgHWNYjsdqJYLGC2oZGMHckyGI6iNJFD7vGjdYrbUHeebTOuUiNPnSLI2Z3JG3FVLYc27aAkghiSBPSJrn3BAfNC5ZOoIjdIhhHb/m1dCvMxVpc6QRm5gj9aUOE4H/ALlHY5SlwSe0xP350/L9g7HOwyXLN0ZxcZLfWdRzPePmKypOP4K0gd/OYO+UIFGjRMBveT05VlKlZRIGW7q2stmMrFpa7bAfMTEr1ZjOs6DlNG71iLttchAusRcUnUCCQ0D3E96A8UOV7bNpcVzCMNMkZQF09W//AMo7iWOdioJS2pygAMUManedvympx2yiZ6eC5DcZiFV4nSfXOjECIjr3ohjbHmWUAgCRJ6cqg/bHfC3C4BItkh7ZlHEbqeumxrfDB7ltM6m2rCSo1bbryk1o/FaHEzxJwoLda490BdBmtgkyTEHkvvNReEr1i9de1aW4HyxnGoAX+M9DpERvT9jOHWXstaKgI2+XeeTAjn3ry0rLcAVGyhZLQBm+Yj1djpFRlJ0Lw2D+KWRhMO14FVKKcyhiEcHTU7yJ051wvimMLP1kzAp6/Fjj6XWS0rOFtiWB09Z6D251ztTrI5jnV8MUlZSiddhEAgag9feo7hO9aIxM1JZUxHLpWhM6jNZ7GprQn0tz0nvXloEHrG1TrZLGfrRcqCoM0AKlRzFRXnGYjkJ/U/5q5+xuxGh0qhiLDZmHLrQ5DcGXMBdEZT8Jmfp/ut8K+cMragaDrO4Iqla9InoPvVjCOEUCfUTOncRTcheI3eBOKnD31RhKXCEM/wBXpPyNdS4xgcQ5/d3lTT1AKQSeRma4Vcch1hv9HcV3DBcRa6tp1ZFs+VNxdipI3HQCoZa9gkDLFu6riy0Zm1lcsHnBJMz3A6UB4pg3tw1wqzF1kg+kQTEggakDTrTbbuvcJNy2DbT8uY5o5OdNdNQPnUl6zZu6sdHAWIPqA1EzvWRJXpkJQsCfsj3LWeyYYqRlgSRmkf7qpexbvlPlFioWUt+o/wAwgAa8zVvGWjZOW00WdsoBkE8p/tUNq4pDgqZRZlp9I1B1567/AOq66ZKVHn7W/lAKCrxs0LII3HbtuKG4TBAstw3QM0hlgknlJ3ABMb9KtYnCAQjW1ysZ9CgQpAGsSdImZM1Xwz21ZQ7enQsRqSJWNOWw+/emEsO8R4QTZNx7ryuuQMImdorKuYd0a0xuegtJVX3yAyBHy+leUyZdVQu3MWHa2ttQ95NS76+Y8gAr/LMnppOsURwuHnHEF8pGqlYgvHqUjnvmHzFUMWLguqwVYQZbQgAKmhJBHOdO3zNMODm5iM6wQFBZSuueSAy/U6cvnSQVyGRV4jZYI625BYM2WMquOek6EMAe80fwF3NbRiIMCR0Mc68xIAI1iTMnfblU72pHvzq6XZVFdgi+osV5wWIH0rfEk5CRM8o3qviWIf4ZAUgztpqCfuKkwTgAAT1kmdfnWZ5o7T0Gjin4o4QW8YQCTKhjPU0s3DCqJBJ5CnD8YbTDGluTIkew0P3mk3AJmuIvLMK1YvxQyRe4ZgC3KmXA+HQR37UTsYJUgUSwzhdqhPK/R6WPDFLYLteEhvrRThPhBZlpAozZeQKv2bvKlU2xnCK6RWTw5aAACyB7VXveA7LSZg9BRdb0VOuJ0qiZNoRMf4JRdNSO8b+9c64nhjh7rLuQdzX0BcTMprjnj1IxUEbARVcbfKmSyxXGwHgM7xmmZ36DvXW+A2DatW7jMxuZY8tdip1jYkn6VzvBgFQcsmYGnMj+0V1rgtwJZt5mXQgKW0n0jMO5n7Cn8iH1RgbNOH4+Trau2AwIXOuhIE6k6/8Aw15fseXJb1AgH/y69o9MewFUGdUFq5ccm3cYgFmACsDpIA1+dG7Wtprgdco3ULIUfy6aTv0rBTqhRcxKs10iyTmuCAGYQj6Q0j3J2396uXvDl9HdmupkbTzCT6QNRmX5bCsu8SCeXdl8ltvUFgbxrp+Wdx3ojb8UWrgIEP0HVukUIZBOMfYPfh+XDlrjAXWOYFSZ01A9tBpyoXi8ROXMAuQ5TcK5UBkkgGIIkmr3EuJuyJ5KhRvLL06k7dqhtX0IyjKWKgNMZgzSM2umWZntVItvZHJV0ijwjiYZvSzMtpiPMK5gEj0iOwB17msq5/0uXAVvhJcshAD2wI1APqO0VlNaJ2yfFWGvYhlWcoSFE6agST16e/tU3gPGmblt+RlT2GjKfoDVjht3Let6yotZV0iSWj/cVT4Lbay154BDgFddRqQT8xSKfFmmLDXFsflCPbMhyQJmARuTH/Nqnwl4j4laYBJkmZ7cqBYhtEgEAtqPsNKP4m4bZyicz8ozZQO36mnjJtciqJgS26kH8pPMdCaGtbfzlJOkzkAAn3J1PsKI4WEBUqdNcwUAa/Oh3G8YyXLYRWaVkADVo5/IVnzYk/sux0xN/HDDSuGu6fmQ++jD+9cy4SJu2xzLR867T48wH7TgCEBLIfMzZYBYAgjXnBPKuReB0zY20rcifsDFafHf0orBW0PuKMVJYxKwJIob4vR2ORDA3NKF5Au9/XogJ+9Lws9Hm0jsODAZRH2qzaQia5h4d495RAZ2K8prpfBMUL4kdKRri6HW1ZZDgDX70IxniOzbOWZPaI9qqeMr4tKSxI5AAxNKnBeIBLrJ5MuNSMgbTTmxPUa6U8G2K46OkcL8R27kKy5Sdj/mk78WOGEGzfA9M5GI76j+9MXC8fbe4bbW1DoYjLGo9pB9wfpRfxPgPPwN+3GuQlf6l9Q/SrQlbIZFSOPcFvetZ5nny6V0nhed3tqCCBtOygf+Q9CTmgUB8D+G7T2lv3FLy2kkgKBzjmffSrxtXAXYqWd3VLdlDvOb0mI21JH1psuRPRgy43Gn+xgbGh2OUzaa7BYDREPphVIIPqgk7RVuGVwHugAtAyJ8EGJPIBu8igeCwgul7OcFQB6VX0yDJGeBOvQRppRDguDYuQ1pjAEC6Vz2+RyuCZEg6Has17IplfxFg3I1LoygqhWSWXY+4jcEe1KPDVBDMGKC3u0xoTC7DlHtTvxNbvmMc2dPUV8r4gsgkx/EvbWk6+MhUoyuHjK9r8pZiDI5giTlPM1PjtksiJv2lQCoZjmUjNlmG+LMSTEkgDprW1txbc+ahV1MuojKWMyVnQz23qvafKHsZZGYACG9Y/KcvKjWCC3WS3oWYZczjMAC0j6mqqNKiREth7zoWcWgQCWOXSRBAWNYA361lUOP2bi5AzhpJUIoMAyACTz2mNhWUHBi2MfB5ZLbGdARPPc61ftYUsuVdfTt7NpWvCsOuVkg5hOk8hGo+u1XsPZKupzqREAlf+RSta2aIozGYIOiMikEESux0NTX7ZJdjodpU/l6TRENI6+1Q310IGs9elaVFcaL0B+EI11ne6ZAOUAabdwdf81mMSXGoa2JILD0gnmxO5/WvRhyrFUbU6iUMKo5aemd60vLdcDW2wQnMTAEwdPSSPrzqXHQyAnirFj9mCI49bepUaYygk+3LakLgfDMnELRHNWPzymuheLMNmsh1U/ujJIUBcrCCZGk6ilHhTf97aJ0ykqf/YQKmm4yPTwRjLF/TOMYJrpYTuaH2OCLlCMGhTIjqd9aa2WGIjnRHD4RTqRRtpl4pNCNjeFKQgCEKmxJJ5yfqadPBnpQACh/FLOd8i6RqaYvClgBRNC7exmkos147whb/wASqSNQSKGcN4SttpayjHrlE033lknK6mB8OhofhbgY1RkYytE+GWY9AAGwq/fHoI6iPqKkswBVfGXoBPQTVFSMspOTFXwkQMEUiCM8D7VX47i3tnMPS7r5doKNcp0uXT3YiB2FXw3lW7mJbKim3CL32BPzihVq2c6XURsRf0LZgSFOuWewifoKlLu2J5UlSiggti1h1t2ZXzGBNwEsXMqdFGyyNJOsVe4CxCh7eaWuMEz6GABmtt1MDRucUIt2Sl22xAd7rDzb7sIY5vWiidAsan6Uw8KlGfCkrntt5lpwdxAIEfUfOhVswgzi3EhYuC4285mAkAsdGP8AK0DttS3j+Dvma7ajy3IYBzJUEzt3pw8R4S3cvMrMPUM3l82AENBjp+nelvCXFF0Wy8qo1b8sCd122H1pdpiSaQLXF3IdUiVdUyiZJ5nrECK3wuKKZjrCtBKGRmMmZ6aVcxN1CwJBSASrwAxjUNppMUCxuJ1fICVzSxuGSWp1KzOth3EZ3JzFczAQFmQswZHOYrKGLcZlz+ssqyDEenoP81lNoLidHs2wrhoC5iYj+nUfYfapcwJGsmDy771Fw9c6qumZZKNHxLBEHow2qol4i4FcBSJBI2Gu1IXejTifFmwoFxczodwfykHr0P2re14hS4FuWzIOuU6QeY9j9jB2qTHcSwy3AM6ZV+JTJmd9I19qAcaw1gHzMG4KTJtgH0916r1HLeozbiuUWUTpDbhrqhTctl2F1jKmIV+jdI2oTxHHAMyZ0zyBkylRb5yTsR8qHeHuM5WIkxtcUHWI+Idx9xFM3F8OHFu9bRXKmMzDXL2PSd/c1THm5x/pRbVlTB4q2WZQtw2rgyhfLaMkRMxse550g+IOEtYuEa51YMrDcoNVmunMSSCrhTsARowGxBqvxThNu6oa+M2UEE5oMf1iDHvpTVZfDm+N/wAE5sQHAcfm1+vKieHvDLQTi9j9num0JyHW2Yj09PlUF7FsbTBfiilmj0cU1JWiHjHEvU2ViCwykAakHervhe+UssQjADZRJk0s2XNmDkLsd2Owpl4PexDgEFR2zGjGJdJyDtlShFxcMo01KDKY5zG/zq8mIQuCNCd1NUMPYvxmLqvdZ+1eY3CYhhLeWVGvwkP840p2iMo0xpS5pQ7jd8LbYnSdJ7cz9KnwLTbUk6xrS3x/FtdbIgncADnG9BP2ZJ/VNlzi+NS9hlW2SqlhDFZ0ykbH+9V8VfvPato7SwMkEmHWAFJj/wBvTzqReGhrVtJfMW9ITkBoRr1+01oi57ui5iTkAnTeI03Gh25Cp/IpGGU+XZBwzhnrtXLjMHElLZYaW9YMDbSTFR+IXuWjZvAN5tpijAkeoDKynTfRonpR/A8KR8ReuFmi2oUMWEZ9dY/Sh3H8UpvAD1ZPSZ0G0SBvMQNTQlJxVsm0RYa7mLkMfKBkKfiRt8qnqpkT0rMDgMPdjMrubpJGuQGCJaBsomNyasvgbhsP6Jdl8uzaJiTtmnkq6maErYS1CLcL5FClvy5v5B0789TU5KShyb7FdVsIY7hlkEeXmaIAUnReWaecf270NvYO0skyfVmY87jch1y9udSftMCBO86mdTzrGugDfU99f9VkU5fsk5K9GXbxKjMqg5pWRIQxHqAPqPQDQVlQ+cPbvWU/yMHI6ErBSCVCEzmyGR8+vKhONw8fvnCg92hZnvyrSxxe6EDG0MjHS8ADlO0lJ1+tDsfwh7zZ0xNq+ea3sOrEdt5A+Vb0uXs0yWjFtYDEv6/L81hOVJIJ/pnf2M0MxXhMqS+Gu+mdQCWy/I6j2b61dTwsbjfvLFpGGzWAyz8mMfamGxwArBa8zEaAsPUOwYa/cjtT/FapoRRE0cPcsitlS+Nbd1fguj+EkxB99VmDpTP4UxrKMrqyKxiGEZbg3FX79qzbnNLliM22rCIaNgYI1FYeL2AWBBOcyRG51E//AM1KGHjK7KR0WreEMEOS3eTtJg++v2qJrdxJyMDOozLpPQwf8VJZ4jZMAOB0zafrVoIrd56GtFRa0xjn/jrDu1pWOUXEM5UBgDoJ/SlDh3EwRB0MRXR/GSYa1b8uIvXtV1JMLqT7f5rkHE7GVpGxpOFabNvjNqIfwji4CugPKiWEw1+0JXIemhH1E0kYPiBRgaceHcUDCS2oFK40bI5Ro4T58fvGRB0Qa/Uk0TxjRbMazSuOIhdc2g5k1DxHxGmXLbJc7AA6DvRQknYVfjAVCAeW1WbGGNrDqxE3rzg5ecflT2kyaB+FuGNecXHnIDPYnfTtNMPGeKixisLnEqQwUnYXfyAnodR8qdY3JOKM3kXwCNwJhku3JkoMgY7tdO5H/P0pa4Rind2K/EQQpPUj1N9PSPc1H4jxhbJZnRBLnrdbVz8pj61q179mVSD+8KjKoGqTrv1IP37Vkm90vR5rYe4vxNMLb8u0uon1H817mZ55ZJPeBVbw/wAEzKLt6Mrety/K3rqe7fYSedDeAYIXWN7EECxZ+InYncIOuup6/OpvEHiM3zlAKWBqFO9w8iw5DoKe1XKX+I7vs1474g812KnKjAKq8ygO3sTy5wOlBheJ/wAdP91cwF7z81loLsP3TH8l0bLP8wkfShdsmPSCSeUbe9Z5ty2xXFst+aFHeo/NO/M8udSWuHXNzbf/APU1t+zkbqRPUGotUJ8bISRpmI15f83rKtrgIPqZUnrJY/8AqJY1lGheDG3A8AvKtwZrYzTlDqWCAiDAnU1PhvDrenzry3MgAULaUaDbUyaPCNT35/2qtib7ERbjaTcOoA7dTXs8IxRrLFq2FEAADtVPiN4j6E/2H3P2qXhzErq0kc+fuakvW+YEmQPlP/DRTUlo5qgHjcGblxwvIuB7+WsfcCoX4I7tqIU694eCY7q2sUy27QBY/wATT9gKktXASJOpJgdYocE+wcRaXw08TnA3JESJ6r0B6Hat72AFm35hPpiTH20/wRXnEPGViwkGXuCQVGnM7n/FI/GPFjX7SWz6UXUKDqeknnQ/5ovdDxTFrxRxotjbdw6KDljoCI/vV3E4QMKWONpnDN0MiiXhPjysFtXTBGisefY12XHr6+jbgmk6ZHiOHleWnWtsPgDyn5Gm6/gMwkVHw/CAmCPpWXmzb8aA1vgbOff+Ik0y8I8KbZzIHIaCjGAwag0csL2oxlYrikb4PDBFCgQByrm34kcQFy9cRSCbNsAGTpcBL7bGPTTj4r8SJhLJMg3G0Re/U9hvXGsZjiLdws0lwZMfETuT71u8WO+Rh8mWqOt2cKmIs2sRBLFAzKv5zl27GdJpex11i7XLshmJJBEfb7Cj/ga5/wBnaH8KxVjirEQ8Bwp9SMAQy9p2Iq2fwo5Xa0zDQvpeu3LaoF9NvUINlPN3PNvsKmTgpBU3XjOSPTB1Ak60y3bqBEYA+SRsNApPNgN+k8ulD/KOZTaYBULEahiZTLHQnQfPWsb8GSe9hSQM4ZhSfMuWrQFu04HnTmIMgk5SeWmopm4n4dvs5a3eKgtmyjKADuRHSaMcC4ULNi3aHwBFJ1zAvu29FXHvRjhivQwh3PB92Qwv+smSxDMAOigNA99flVK9YxlkCGckyIH5gTGgJINdHPQGPatBa6mdeYFM8SZxzixgyZFxDZuQZYSCzDcaVldAx3D0u76GIkbgEgmPpWVJ+MgJEvFOGpeXI8legPef9VX4oii3kKyremBO3uNveiGNxCrpux1CjUx1gaxSjjeLIrs14gnYrauEyORAiBHemzNv6xWxkgvhb0DKp9emj7t2B2mrAxQj1EgTGY6ZT0YUh4jxG2oQaHm+pj9PrMcqGYnHXLpm47GNJJpsOCajUg1Y6XPE9qxnUk3WLEjKZHtNKXiDxVdumAQoEwF5A7id6A8XxTLbfy9GjQ1U8NOcRbYkgupjXmNxWmGNINURYsFtTrVYmiWLUBsrSCNxzqqUWKeQ0SCzZzGOvKlfH4U2bz2z+U6R0Oop74XYgyfpQr8QsJD2bw2dcrf1Lt9j9qFaOkXfCPizLFu+ZXYP09+3enlSoYMIIOoIrido/wDIpj4D4gez6GOa2T8PNe4/xWTL46luJow+S46l0dkw+ITtQ7xH4ot4e2STryXqaSMZ4vsqJRwxImB/zSl63cuYh/NbOSCCIiFBMEkn3FJi8dt7KZc8UtGcRx1zEXDcuEydhsApEgUO4zdQ28qiNdyZO9FVwqr8bJI3BJc6NlOg7a0M49oqDX4gNUyjMpg++kV6CjxVI8+UuTtnWPBvpsp0I0P9qvccvQnz1qr4ZEWFG4irGMVl2BedNwPmT0q0ZHOJNwXFrlIJGUjWeVLXiLi1uyWeyC2UgEroJJ5dau2uHQPi9caAfCB0A5/OgfGrI8piBlPmoCO/q1imuwKI3cH486RqYImCaYbfGRcAzEgcwDE/MUmWkECPvV21cgDrSuMWGh7wuJtnQQCfbWrUUkWMVI6EVbwvE2BGutTeFehRrisoH4f455xhtSXdVP8ASxj7CsqMoNOjjneO8XX8TbtPmhWJW4B/+TdflE6dQajdyRypY8MPnt3LPMjMv9aaj7SPnRXD3DHaKpr0Vii4rxWj3Ceda2l71Z8rauGojfB5kI7UteEbxt4hrZ0zafMbf3p6yAJ70jeILRtXkuruG1ii1QB14hYVwAyhhyPMdweVL2J4eVOZGzDfKw+0imIkGyGGsiflQpNzXSDEgwrH6174lwvm4C5zayQ49hofsftXtxYNX8CgdWtttcUpHuIpUF9HLrI2rqPhL8LlxmD82/fe293VFTKQE6sDvPSRpFcruk25H5gYg9Roa+hPww4ot7CWoBBUZSP5hSttdEkrE7H/AIG4ja1i7RH86Mp+xNVvEXgS5w+1bL3UuJorEkzJnMVXmu3fSa71NcI/HPit84vyEuEW1trKCBJMkyd+ldGTsVATUDXPA+IKqoNsr767ZTS7xv4kECc4B9RY5hoTPepOB8SzSl2C6iQXk5gBGWOsfoKq4nXEWl5AjfTc7/Sq3YF2dq4XARY6CrNxp0mquD+AR0rfPrH60SxFj7ebbQilvxBiZsKGPqF9de2VqYsRdgmKTvFDfu7WurX9fkh/zRQBlt3Nh1oitkxQ3ApngjlvTALUCjZzKVrTSpQYknYa/TWonHqqDj13y8NdI3yQP6m9I/WusFFTgmONrD2LnORc95Yt9wYrKg4kRZsIP4VCgfKK8ouKfoUQfDmJhwV3Bmmd0CuQNj6l/pOv21HypLw6GA9ucy7gb034DFC7aV/z2jDf0Nz+Rj61nRSPRbsDWr9kCZNDLR1npRG00xtRQ7JsS00v+I8N5lpo3Go+VHrvaqrL6SOtMwFbwZjPMw2Rt00+XKpmEHWgPh255GMa3srmI99V/wAU0cQtQQeVd6AUsQJ1qbAmGHYzXjLpUdoQRQCI/jXBG3jbv8LEMvSG1/Wacvwa4wLd57DEgN603MkaNEfKhv4kYXN5F4TsbbEDaNRPyJqn+GaH9vtMOQO20bUJE1+R9L2bgYCJ+YIr52/FK7m4piTyDKpHYIulfQ2AeUFcW/GngPkYlcUjZRiPiETDgQT7RlpIdiPTOaPZBYGYg6Nr6fet8MrHF2w2+YRPSN6ktKG0+nSep7Vvw8TibBkkq0GesHbtVDl2dcwzQoqTn1NV7Gqg1tcXoTTlTMZEZh050meIDmbDJrq5P1KjX6Gme/dlT9NaW3tl8bYtmfSBIH/s3+K44cPDFqAZHtRl7mx6mq+DsFEPtUGKu5beadA0n+9cA9bS5l50M8QXQ97DWP4rmdv6U2+5FFmtzcU8iJ0pe4NN7F372uW1+7T6y39vpRCXOMYcOddhr86yr17DZt6ynTEaOP4FQ3VWHMUzcDc58rwQ4ylxoQDpr1rKysxSPRlq8ysVbRlMGeoovhnk1lZXexi49Vx9qyspzhb8UYUhkvLoQYJ6dDTVhL4v4dXBk8+x51lZXIVlYIa0ArKyuOIvE+H8zA3etuLgjoDB+xoV+FNmb9y5/CFE+5/1XlZSz6FX5H0Lwz4Y70mfjZhFfAKzT6LqzG8MCP1isrKmu0Tl2fP1lylzK05W0IG//wBq7gFIxKFtlO/ICPvXtZVALs6twu6roChlSJFb3tRWVlU9Fgdf+EAbkxQ/w8vmY+65IISRoNZ0Xf2BrKyuOY34/iaIvqZV7sYpPv8AFndXRMozNozdI1Cpu36V7WUyQgy8IxJOGzvqbQYT7DSqngvDZMMk7t6ye7a15WUpQLm6C0AyecbCvaysphGf/9k="
            }

            // profilePic: "https://i.ibb.co/FBb2h5k/RAN-PRO-11.jpg"

            const result = await AsyncStorage.setItem("dmt_user", JSON.stringify(user))

            registerForPushNotificationsAsync().catch(err => {
                ToastAndroid.showWithGravityAndOffset(
                    'notification server error!',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    100,
                );
            })
            this.props.navigation.navigate("Reload")
        } else {
            ToastAndroid.showWithGravityAndOffset(
                'Please fill required fields!',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                100,
            );
        }
    }

    handleSignUp = async () => {
        this.props.navigation.navigate("SignIn")
    }

    handleToggle = () => {
        this.setState({remember: !this.state.remember})
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <>
                <LoginHeader navigation={this.props.navigation}/>
                <ScrollView style={styles.root}>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10}}>
                        <View style={{width: 150, height: 150, backgroundColor: configs.theme, borderRadius: 10}}>
                            <Image source={require('../assets/icons/login_logo.png')}
                                   style={{width: 150, height: 150}}/>
                        </View>
                    </View>

                    <SocialIcon
                        title='Sign In With Facebook'
                        button
                        type='facebook'
                        style={{...styles.socialIcons, marginTop: 20}}
                    />
                    <SocialIcon
                        title='Sign In With Google'
                        button
                        type='google'
                        light
                        style={styles.socialIcons}
                    />
                    <Or/>

                    <View style={{flexDirection: "row", width: "100%"}}>
                        <Image source={require('../assets/icons/username.png')}
                               style={{width: 24, height: 24, marginTop: 30, marginLeft: 20}}/>
                        <LoginTextBox style={styles.materialFixedLabelTextbox} placeholder={'Email'}
                                      value={this.state.email}
                                      handleChange={(value) => this.handleChange('email', value)}/>
                    </View>
                    <View style={{flexDirection: "row", width: "100%"}}>
                        <Image source={require('../assets/icons/password.png')}
                               style={{width: 24, height: 24, marginTop: 30, marginLeft: 20}}/>
                        <LoginTextBox style={styles.materialFixedLabelTextbox} placeholder={'Password'}
                                      value={this.state.password}
                                      type={'password'}
                                      handleChange={(value) => this.handleChange('password', value)}/>
                    </View>
                    <MaterialCheckboxWithLabel1 style={styles.materialCheckboxWithLabel1} label={"Remember me"}
                                                checked={this.state.remember} handleToggle={this.handleToggle}/>
                    <MaterialButtonPrimary1 title={'Login'} style={styles.materialButtonPrimary1}
                                            handleSubmit={this.handleSubmit}/>
                    <MaterialButtonViolet title={'Sign Up'} style={styles.materialButtonViolet}
                                          handleClick={this.handleSignUp}/>

                    <MaterialButtonWithVioletText1
                        style={{...styles.materialButtonWithVioletText1, marginBottom: 20}}
                    />
                </ScrollView>
            </>
        );
    }
}

function Or() {
    return (
        <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
            <View
                style={{
                    flex: 1, alignSelf: 'stretch',
                    borderBottomColor: 'grey',
                    borderBottomWidth: 1,
                    marginLeft: 20
                }}
            />
            <View
                style={{
                    width: 20,
                    marginLeft: 15,
                    marginRight: 15
                }}
            >
                <Text style={{
                    textAlign: "center",
                    color: 'grey',
                    fontSize: 16,
                    marginTop: 20
                }}>or</Text>
            </View>
            <View
                style={{
                    flex: 1, alignSelf: 'stretch',
                    borderBottomColor: 'grey',
                    borderBottomWidth: 1,
                    marginRight: 20
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "rgb(255,255,255)"
    },
    materialFixedLabelTextbox: {
        margin: 10,
        height: 50,
        width: "80%"
    },
    materialButtonPrimary1: {
        height: 40,
        opacity: 1,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10
    },
    materialButtonViolet: {
        height: 40,
        marginLeft: 20,
        marginRight: 20
    },
    materialCheckboxWithLabel1: {
        margin: 20,
        height: 40,
    },
    materialButtonWithVioletText1: {
        marginTop: 20,
        height: 36,
    },
    socialIcons: {
        height: 36,
        marginLeft: 20,
        marginRight: 20
    }
});