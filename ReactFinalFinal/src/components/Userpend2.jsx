
import { Avatar, Box, Container, Divider, IconButton, Typography } from "@mui/material";

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function UserPending2(props) {

     const stamPicProfile="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAeAB4AAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCADiANkDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9U6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooqrqGpWuk2rXF5OlvCvVnOPwHqfamk3ogLVMklSGMvI6xovJZjgCvMvEXxh+9Do8Ge32m4H8l/x/KvPdU13UNakL313LcHOQrN8o+i9B+Fd9PBTlrLQVz2rU/iToGmZX7Z9qkH8Nsu/9en61zV78ao1yLTTGf0aaUL+gB/nXllFd8cHSjvqK53s3xk1hyfLtbOMe6sx/wDQqqt8WtfOPmtx9Iv/AK9cZXFeMvjB4Y8Dzm2v70zXq/etLRfMkX/e5wv0JB5p1I4bDx56lkvM68LhcRjanssNBzl2Sue2R/GDXE6x2cn+9E39GrRtfjVdKf8ASdMhkH/TKQp/MGvlqz/ae8I3EgWW31S1GfvywIR/465P6V3vhnx/4e8YD/iUatb3cmM+Tu2ygeuxsNj3xXNTq4DEPlpyTfrqd2KybMsDHnxFCUY97affsfQ+n/F7RrrC3KXFk3csm9fzXn9K6vTdbsNYTdZXkNyO4jcEj6jqK+badHI8MivG7I6nIZTgj8a0ngYP4XY8a59PUV4joPxT1fSWVLphqNuOqzHD/g3+Oa9O8O+OdK8S7Ut5vKuiP+Peb5X/AA7H8K86rhqlLVq6GdBRRRXKMKKKKACiiigAooooAKKKKACiiigAoorzXx/8Sfsvm6ZpMmZvuzXSn7nqq+/v2+vTWnTlVlyxA2vGXxFtPDYe2t9t3qOMeWD8sf8AvH+n8q8e1jXL7Xro3F9cNM/8IP3VHoB2FUWYsxZiSxOST1NJXv0cPCitNyQqK6uobK3luLiVIYIlLvJIQFVQMkk9hUtfMn7RfxMm1XWJPDGnzMmn2ZxdlTjzpuu0+qr6f3s+grnx+NhgKLqy1fRd2fQZHk9XPMYsNTdlvJ9l/n0R0fjb9p+2spntfDNkt8ynBvLsERn/AHUGCR7kj6V5pdftBeOrmUuusLbrnIjitYsD81J/WvOqK/Na+bYyvLmdRryWn5H9GYLhbKMDBQjQjJ95JSb+/T7kj0b/AIaE8c+RJE+rRvvUrv8AssSsMjqCFHIrzuaZ7iV5ZXaSR2LM7nJYnkknuabRXBVxFavb2s3K3d3PcwuX4TBczwtKML78qSv9wU6OV4ZFkjdo3U5VlOCD7Gm0Vznfue0/C39oa/0W4h07xLK+oaaxCLeMczQe7Hq6/Xn69K+mrW6hvbeK4t5UmglUOkkZBVlIyCD3Ffn5Xuf7N/xKfT9S/wCEX1Ccm0uTusmkbiOTug9m7D1H+1X2mTZvNTWGxDuns+3kfjvF/CdGVGWY4CPLKOsorZrq0ujW77rz3+laVWKsGUkMDkEdRSUV98fhJ6H4R+Ks9j5drq5a4t+guRzIn1/vD9frXq9pdw31vHcW8qzQyDKuhyCK+Za6Lwh40vPCl0NhM1k7ZltyeD7r6GvNr4RS96noxnv1FU9K1W21qxiu7SUSwyDg9we4I7GrleK007MoKKKKQBRRRQAUUUUAFFFc5468VL4W0dpEKm8mykCH17sfYf4VcYuclFAc98S/Hh09H0nT5P8ASXXE8ynmMH+Ef7R/T69PI6dNM9xK8sjtJI5LMzHJJPUmm19JRpKjHlRIUUUVsIyPF2vR+F/DOp6tJgi0gaQKf4mA+VfxOB+NfCV1cy3lzLcTuZJpXMju3VmJyT+dfVH7TWtHT/h7HZIcNf3aRsM/wLlz+qrXynX51xHXc8RGitor8X/wLH9B+HuCVLAVMW1rOVvlH/gthRRXV/DD4d6h8UPGNloVgpUStuuLjblYIQfnc/QdB3JA718lufqFWrChTlVqO0Vq2V7vwPf2vhfw7q/lsza5dXNvawKPmcReUoYfVpGX/gNc66NGzKylWU4KsMEH0r68/aa0Sz8M638GdKsIhBY2V1JBEnoqvagZ9T6nuatftJfsyv4kmuPFXhG2B1RjvvdNjAH2g95I/wDb9R/F16/e0cHrY+TwvEVGUaEsR7qq89n2tJpJ/Lr3PjiipLi3ls7iSCeJ4Jo2KvHIpVlI6gg9DUdZn2O+qCpLe4ls7iKeF2imiYOjqcFWByCPxqOijYGk1Zn3D8N/Fw8ceDdO1Y7RPImydV6LKvDfmefoRXT187fsr+Jitxq/h+RvkdRewj0Iwj/mNn5Gvomv1/LcT9bwsKr32fqj+S+IsuWV5nWw0VaN7x9Hqvu2+QUUUV6Z82dD4N8X3HhXUQ4LSWUhAmh9R/eHuK94sryHULSK5t5BLBKoZGHcV8zV33wt8XnS74aVdP8A6JcN+6Zjwkh7fQ/zx7152Lw/OueO6GexUUUV4ZQUUUUAFFFFADZJFhjZ3YKijczHgADvXz74y8SP4m1ya5yfs6/u4FPZB3+p6/jXp/xW17+y/D/2SNsT3pMfB6IPvf0H414pXs4GlZOoxMKKKK9QkKKKKAPnr9rG5O7wzbg8f6RIR/37A/rXz5XvH7VzH+1vDy9hBMf/AB5a8Kgglup44YY2mmkYIkcalmZicAADqSa/KM6d8fU+X5I/qTg6KhkWH/7e/wDSpEmn2Fzqt9b2VnA9zd3EixRQxjLOzHAAHqTX6F/AH4M2/wAIvCYjnWOXX70CS+uFwdpxxEp/ur+pJPpjkv2af2eB8O7RfEPiCFJPElwn7qFgG+woRyAf+ehB5I6Dgd8++15tOFtWfH8TZ8sbL6nhn+7W7/mf+S/Fny/+2yZLG48AaqFJis7q43Ef3iYWA/JGr6fjkWSNXQhkYZDDoR615D+1V4Jk8ZfCG/e2jMt5pUi6hGqjkqgIkH/fDMf+Ait/4D+OLfx98LdDvopA1xbwLZ3aZ5SaNQrZ+oww9mFWtJM8PE/v8nw84/8ALuUov/t73l+poePPhH4U+JNuya7pENxORhbyMeXcJ6YkHPHocj2r42+Nn7Mus/C7zdU01pNa8N5JNwqfvrYdhKBxj/bHHqF4FffNNliSeJ45EWSNwVZGGQwPBBHcUSgpE5XnuLyuSUZc0P5Xt8ux+T9FfVH7RX7Lcem2934p8GWxW3TdLe6TGOI16l4QP4R1Kdu3HA+V1UswAGSeABXLKLi7M/b8vzGhmdFVqD9V1T7M7H4PaydD+JWgXAbaslyLd/QiT5Of++gfwr7Xr8/rS4k06+hnUFZoJFcA8EMpz/MV9/xyCWNXX7rAEfjX3vDNRulUp9mn9/8Awx+N+I+HUcRh8QvtRa/8Baf/ALcOooor7M/HgozjkcGiigD3n4feJT4k0FGlbN3bnypvU+jfiP1Brp68I+G+vnQ/EkKu222uv3MmTwM/dP4H9Ca93r53FUvZVNNmUFFFFcgwooqC+ulsbO4uX+5DG0jfQDP9KNwPEvidq39qeK50U5itQIF+o5b9SR+FcnT7iZ7meSaQ5kkYux9STk0yvqqceSKiuhAUUUVYBRRRQB84ftPQyan4w8N6dAAZ5ISqA92eTaP1FfTvw8/Z58GfDuTTb200xbnW7SHYdRndnZnP3nCk7VPXBABAOK+ZvjndrD8bfCJdsRQpaux9P9Jcn9AK+5a/LMytLHVX5/ofr+IxFfD5JgKFOTjGUZN20vd9fvCiiiuA+TEdFkVlZQysMFWGQR6V8h6peXn7J3xneWCOSXwJr7ea1ugyI1z8wUf34i3HqrAdTkfXtcr8S/hvpHxS8Lz6Lq0Z2sd8Fwg/eW8gBw6/nyO4JFRJX23PbyrHU8LUlTxCvSmrSX5Nea3Rv6Tq1nr2m22oafcx3llcoJIZ4myrqehBq3Xxh4d1rxn+yP4sTTtfik1TwZeSYDwEtEe/mRZ+5IB1Q4zjvw1fYGg69p/ijR7XVdKuo72wukEkU8ZyGH9CDwQeQQQaIy5gzLLJYFqpTlz0pfDJdfJ9n5F/rweRXytH8HYPAv7WvhuWyt1TQtSFzf28ajCxSLDJvjH+65RgOwYDtX1TVK80a0v9Q0++miDXNi7vBJ3XehRh9CD+gpyjcxwGPngfaxjtOMov5p2fyf6nzD+2b8NbeS40LxTZW6x3Fzcrp16Y1wZCwzEx9wFZc/7o7V6gAFAAGAKuftDfZZ/BOn2U5XzrzWrCKBW7t56s3/jgeqlfacOwsqsu9v1PLzzFzxGCwlKf2OdL093/AIb5BRRRX2B8WFFFFAArFSCDgjkEV9FeFNW/tzw9Y3hO53jAk/3xw36g1861638GdSM2l31kxyYJRIv0Yf4r+tefjYc1Pm7DR6LRRRXhFBXOfEO7+x+DdSYHl0EY/wCBMFP6E10dcT8XZTH4TC/89LhF/Qn+lbUVzVIrzA8Vooor6cgKKKKACiiigD5W/agOPiJaEcH+zo//AEZJX2T8HfiRY/ET4e6dq63kT3cMCx6gu/BhmVfn3Z6A4LAnsa+Ov2pYtvj7T3/vabH+ksv/ANavIbeaaLesUrxiRdr7GIDD0PqK/Jczl7PHVW+5/R2CyeGdZDg4uXLKK0dr+qP1dory79nP4kJ8Qvhvp5mkL6rpyLZ3gY5ZmQAK59dy4OfXd6V6jXLGSkro/LsVhqmDrzoVVrF2CiiiqOUx/Fmm2WtaHcWGo2EWo2VwNslvMgdWHXoe4xkHtjNeK6P4fvPgJPc61oD3F34HZw+q6NIxkazXobiFup2jG5TklRnJwNv0BJGsilWGQagk022mtZreWJZYZkMciNyGUggg/UE1hKEnNSTPWwuO+r0pUZK8Jbro/wDJ9nuieKVJ40kjYPG4DKynIIPQivHvi5+0tpXwj8WQ6JeaVcai0lmLppLaVQUYswVCp9Quc54yODmvUdJs4fC/hqztZZwLfTrRInnkOBtjQAsSfYZr82/it42b4h/ELW9eJPk3VwRApz8sKgLGMHodqjPvmqnJxWh7nDmUUszxNT2yvTivTV7fqz1fS/ixq3x0+OGhXF9H9j0mwMstrp0b7lixGx3E4G5i23JwOmBivoWvk/8AZmjEnxKLHqllKw/NR/WvrCvv+HY/7I5d5P8AJHz/ABzTp0Mxp4ejG0IQSS+cmFFFFfUH50FFFFABXd/B278nxJPCT8s1u3HuCD/LNcJXU/DGUx+NbAdmEin/AL9sf6VhXXNSkvIZ7vRRRXzJQVwnxjB/4Re3x/z9rn/vh67uuM+LMJl8ISNj/VzI/wCpH9a6MP8AxY+ojxKiiivpSQooooAKKKKAPmf9quLb4o0WX+9Zsv5OT/WvEY5PLbOM17t+1cy/2v4eA+/5EpP03Lj+teD1+S51FfXqq9PyR/VPCMm8jwz8n/6Uz0L4O/F69+Evi+LU4Ea50+YCK+tAcebHnqP9peoP1HQmv0J8J+LdK8caDa6xo12l5Y3C5V16qe6sP4WHcHpX5aV3nwl+MuvfCHWDc6ZJ9o0+ZgbvTZT+6nA7/wCy3ow/HI4ryqTVNcvQy4g4fWaL29DSqvukuz8+z+T8v0morgvhf8bPDHxWsUbSrxYdRC5m0y4YLPGe+B/Ev+0uR646V3tdid9j8Vr0KuGqOlWi4yXRhRRXhX7U3xr1L4X6NY6XosYj1PVklxfMf+PdF2glR/eO7gngY79k3yq7N8Fg6uPxEcNR+KX9M5T9rj44w2OmzeB9Dug97cjbqk0Lf6mPj9zkfxN/EOy8H73Hx7TpppLiZ5ZXaWWRizu5JZiTkknuabXHKXM7n9AZXltLK8MqFPXq33ff/I9N/Zz1BbL4oWcbHH2qCaEfXbv/APZK+u6+D/B2tnw34q0nU84W1uo5H91DDcPxGRX3erB1DKQykZBHQ1+hcN1VLDzp9U/z/wCGPxbxEwrp4+liek42+cX/AJNC0UUV9cfk4UUUUAFdJ8OQT400zH99v/QGrm66z4Ww+b40s2xkRrI3/jhH9ayraU5ejGe6UUUV8uUFYXjqz+3eEdUixkiEyD/gJDf0rdpk0SzwvG4yjqVYexqoy5ZKXYD5ioqxqVk+m6hc2kn34JGjP4HFV6+rTvqiAooooAKQkKCScClrxn9o74iHw/oS+H7KXbf6imZmU8xwZIP4sRj6Bq5MViYYSjKtPZfj5Hq5Xl1XNcXDCUd5Pfsur+SPG/jZ44h8deN57i0bfp9ogtbd/wC+ASS/0LE49sVwNFFfj1etLEVZVZ7t3P63wWEp4DDU8LR+GCsv68wooorE7C3pOqXGi6paahayNFc20qyxujFSGU5HIr9V+tfm98D/AIW3fxW8dWenpGw0y3ZZ9QuMfLHCDyv+82NoHvnoDX6Q100tmfknG1alKtRpRfvRTv8AO1vyYV8c/t0OT4p8Lrn5RZSkD6uP8K+xq+Vv26PDlxNZeF9dijZraBprSdgOFLbWT89r/pV1PhPA4XnGGa0ubrdfgz5GooorjP3oK+y/gj4tTxZ8PtPdn3Xdkos5wTzuQAKT9V2n65r40ruvhB8R5Ph14mE0pZ9KusRXka8nbnhwPVcn6gkd69zJ8asFibz+GWj/AMz4ri3JpZxl7jRV6kPej59181+KR9nUVFa3UN9axXFvIs0Eqh45EOVZSMgg1LX6tvqj+XWnF2YUUUUCCvQfgzZmTW725IysMGz6FmH9FNefV7J8H9NNr4dmu2GGupjtPqq8D9d1cmLly0n5jR3lFFFfOlBRRRQB4v8AFrR/sHiJbxVxFeJu/wCBrgN+m0/jXD1718Q9AOveG51jTdc2/wC+i9SR1H4jP44rwWvocJU56aXVEsKKKK7BGfr+uWvhvRbzVL6QR2trGZHbPXHQD3JwAO5Ir4e8W+Jrvxh4ivdXvWzNcSFgmciNf4UHsBgV7D+0x8Qftl7F4Vspcw25E16V7yYyifgDk+5HcV4TDDJcTJFEjSyyMFREBLMScAAdzX5vn+O9vW+rwfux39f+Bt95/RHAuS/UcI8fWXv1dvKPT79/Sw2ivoHwP+xn4r8SaX9t1i9t/DnmRlobaaMyzE443qCAgPHckc8V4d4v8Mat4H8RXuiaxbm0v7V9rp1BHUMp7qRgg+hrycFl1XHScabSt3PazLi/LMtfK25v+6rr720vuuZ1ew/Cn9mPxR8TIrbUZDFo+gynP26Zg7uAxDBIwckggj5to4614pknrzX2/wDsQ+MRq3w91Hw/I+Z9Iut8a56Qy5YY/wCBiT8xXrYvI3g6HtnPma30Ph63H9bFSdLC0lC/Vu7+6yS/E9k+HHw10T4W+Hk0nRLcomd81xJgyzv/AHnPf2HQdq6qiivE2PjatWdabqVHeT3bCs/xB4f07xVo91pWq2kd7p90myWCQcMOv4EHBBHIIBFaFFMiMpQalF2aPhb46/su6h8OIbvXtEmGo+GYzvkWRgs9oCcANn765IAYc88jufBq+3P21/GI0X4Z2uhxyAXGs3Shlzz5MWHY/wDfflj8a+GlkK/SvWoZLPFYf21N2d9n1PucBx3LDVFh8wjzR/mW/wA11+Vn6lmitHRPDereJLe9n0vTLq/jsUEty1tE0nlKTgM2BwOv5Gs6vn61Gph5unVVmj9cweOw2YUlWws1KL7fr1Xoz3z9m/4mG3n/AOEU1Kb91IS1g7n7rdWi+h5I98juK+jK/PqGaS3mjlidopY2Do6HBUg5BB7Gvsf4N/EdPiF4YV5mUatZ7YrtBxuOPlkA9GwfxBr7rIMx9pH6pVeq29O3y/L0PxTjrh/6vU/tTDL3ZfGuz7+j6+fqd9RRRX2R+QD4IXuZo4Y1LySMEVR1JJwBX0houmpo+k2lknKwRhM+pxyfxOTXkvwn8Pf2lrZv5VzBZ8rxwZD0/Lr+Vez14uOqc0lBdCkFFFFeYMKKKKACvDfiV4X/ALA1tp4U22V2S6YHCt/Ev58j2PtXuVZfiTQYPEmkzWU/G7lJMcow6MP89M104et7Gd+gj5zrmviJ40g8B+E73VpcNKo8u3iP/LSVvuj6dz7A12Gq6XcaLqE1ndJ5c0TYI7H0I9jXyH+0R46PibxgdKtpN2n6VmL5Tw838bfh93/gJ9a7M0xyweGdSL956L/P5H1XDOTvOcwjRkvcj70vRdPm9Px6Hl19ez6leT3dzK01xO7SSSN1Zickn8a+vv2SPgfbWGk2/jjWrYS6hc/NpscgyIY+nm4/vN2PYcjrXyV4f0s65r2m6aDtN5cx24I7b3C/1r9TLCxg0uxtrO2jEVtbxrDFGo4VVAAA+gFfllNczcmftXF2PnhMNDCUdOe97fyrp8/yVievBP2uPhDH448FSeI7GH/id6JGZDtXme2HLof93lx9GH8Ve90josiMjqGVhgqwyCPSvRw9eWHqxqw3R+MVIKpFxfU/JOvQfgZ8UpPhL8QLPWGEkunSA299DH1eFsZIHcqQGHrjHesP4leGB4L+IHiHREXbFZXssUWTk+XuJQ/98la5qv1GUYYilZ6xkvzPlk5U5XW6P1i0jVrPXtLtdR065ju7G6jEsM8RyrqRkEVbr8/PgH+0lqPwjb+ytQifVPDMj7zbqf3tsx6tFnjBPJU8HqMEnP2P4X+O3gLxdbrLYeKNPRiOYLyYW8o9tkmCfwyK/O8ZltbCzdlePR/5n0VHEwqrezO8ozjk8CuM1/4zeBvDNu02oeKtLjCjPlxXKzSH6IhLH8q+Y/jn+18fFWl3Gg+DYrixsp12XGpzfJNIp6pGo+6D3YnJBxgdTnhsBXxUkoxsu72LqYinSV2zz39p74nRfEr4mXL2M3naPpifYrRlPyyYJLyD6sTg9wq15HRTo42lkVFGWY4A9TX6RRpRoU4047I+anJ1JOT6n31+x/4FXwn8KIdTlTbfa5IbtyRyIhlYl+mMt/wM1ufE/wDZt8IfEzzbl7X+xtYbJ/tCwUKXb1kTo/14b3r0fQdKj0HQ9O02EBYbO2jt0VegVFCj9BV6vy3E1PrFWVSXVn2eCr1sA4yw83FrsfnD8WvgZ4j+EN0h1KNLvS5m2QalbZMTnrtYHlGx2PXBwTg1h/DfxzcfD/xVbanFue3/ANXcwqf9ZEeo+o6j3Ar9IfGXhPT/ABx4Z1DQ9TiEtneRGNuOUP8AC491OCPcV+YmuaRP4f1rUNLuhi5sriS2lGP4kYqf1FcKlLD1I1Kbs1sfs+S5lHiDCVcLjIpu1n2afXyf/Do+8NL1K21jT7a+s5VntbiMSRyL0ZSMir1vbyXlxFBChklkYIir1JJwBXg37LXiia80jVNCmbctm6zwEnor5DL9Awz/AMCNfZfwr8Gm2RdavExI4Ito2H3VPBf6nt7H3r9Vw+OjWwscR36eZ/PWcZbLKcfVwbd+V6Punqvwevmdn4V8Px+GtDgslIZx88rj+Jz1P9PoBWvRRXkSk5NtnjhRRRUgFFFFABRRRQBw3xa8E3fizwvfvovkxeI4reQWUk3CM+07VY+mfy/Ovye17SNR0DWb3TtWtprPU7aVo7iG4BDq4POc/wA+9fs1Xhv7SH7MOl/HCxGoWUkek+LLZNsN6U+S4UdI5sc49G6r7jivLzHD1MVCPK/h6H6LwfxBQyatOjiY2hUteXVNbX8vyPzr+G9wlr8RPC08h2xx6raux9AJlJr9QK/LnxR4V134c+JZdL1qwm0rVrRwxilGD1yrKejKccEcGv070i/GqaTZXq423MCTDb0+ZQf618vTTjdM+340Uan1evTd4tPVbdH+pbooqG+vYNNsbi7uZBFbW8bSyyN0VVBJJ+gFb7n5mfnd+1MyN8evFZj+7vgB+v2eLP65rymt7x54ok8a+NNb12RSh1C7knVD/ApY7V/BcD8Kwa/WMPB06MIPdJL8D5OpLmm5LqwoooroMwooooAKls7g2t1DMBkxur4+hzUVFID9aba4ju7eKeJt8UqB0Yd1IyDUleVfsy+PE8efCLSHZ917pqjTrkE5O6MAK3vlChz6k16rX5LWpujUlTlumfWwkpxUl1Cvzg/aEtfsnxq8XJ63pk5/2lDf1r9H68Qh/ZHb4jfHPxB4r8Vp5PhUyxNbWSPiS+YQxgliOUjDA57nHGBzWSozrtQgj7Dh3NMNlNatiMVK0eT5t3Wi8/62OK/YX+DOp6leah4t1W1aDw9JEILbzODduHBJUd0GME9CeBnBx90gBQABgVDZWdvptnBaWkEdtawIscUMKhURQMBVA4AA7VPX12HpewpRpXvY/Pc6zSecY6eMlHl5tl2S0Xz7hRRRW54gUUUUAFFFFABRRRQAUUUUAcL8WPgv4X+M2h/2f4hst0sYP2e/tyEuLc+qNg8eqkEH0qnpfgu58H+HNL01pjfx2NpFbG6VNpfYgXcVyducZxk9etejUVxV8LTravR9z0qWYYinSVByvBO6T6enY85rxf8Aa28br4R+EF9aRyBL3WXFhEvfYeZTj02Arn1cV9NX3h21vMso8iT+8nT8q+OP2yvgr8R/GOuabeaLoz634e0+2Koti4eYSu2XYxZ3HhUHyg9K5sHgZRxUPafCtfuOmpjISpPl3PieirOoabd6TeSWt9azWV1GcPBcRmN1PoVIyKrV+gHiBRRRTAKKKKACiivQPAPwE8ffEuSL+wvDN7PayHi+nj8m2A9fMfCn6Ak+1TKSirtgdl+yR8T/APhBfiMmlXk3l6Trm22fccKk4P7p/wAyV/4HntX6A21rNeSbIY2dvbtXzl8Lv+CedpZtDe+O9ca7kUhv7N0hikfrh5mG4/RQvs1fY1nZQ6fbpBbpsjQBRySePUnkn3PNfI5jhaWJrqpB+p6FHFujDktfsZml+HI7TEk+JZeoH8K/41tUUUU6cKUeWCOOpUlUfNJhRRRWpmFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAGR4i8I6H4vtfs2uaNYaxb9o762SZR9AwOK8k8SfsW/CbxEzuvh6TSZn6yabdyR4+iElB/3zXuVFXGpOPwuwHyhqX/AATq8EzMxsPEevWgPIWYwygflGtYkn/BN7Si3yeObxV9G05Cf/Rgr7Korb6zV/mA+QbP/gnH4aSTN14v1WZM9IbeKM/md1dfof7A/wALtKKm7XWNZwckXl9sB9v3SocfjX0fRSeIqv7QHB+E/gR8PfBDI+jeENKtZk+7cPbiaYf9tH3N+td5RRWDk5atgFFFFIAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/2Q=="


  return (


    <>
   {/* <Box
   sx={{  display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start' }}
   > */}


   

    {/* Box 1 */}
        <Box sx={{   
            backgroundColor:'white', 
            border:'1px solid black',
            width:'36vw',
            height:'36vw',    
            display: 'flex',
            flexDirection: 'column', 
            alignItems: 'center',
            borderRadius:'12px', 
            overflowY: 'auto',
            // overflowX: 'none',
            '&::-webkit-scrollbar': {
                display: 'none', // Hide scrollbar for Webkit browsers
            },
            msOverflowStyle: 'none', // Hide scrollbar  
        }}>
        
                <Box
                sx={{ display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        marginRight:'10vw',
                        
                        }} >
                            <IconButton >
                            <ChevronLeftIcon fontSize="small"  />
                            </IconButton>
                            <Avatar alt='ProfilePic' src={stamPicProfile} sx={{ height:55,width:55,marginTop:'1vh' }} />
                </Box>
                <Typography 
                   
                    variant="body1"
                    sx={{ fontSize: 14,width:'100%', }}>
                                {/* {'54 ,אלי אליהו יעקובוביץ'} */}
                                {'דרור כהן, 26'}
                </Typography>
                
                <Box 
                sx={{ display: 'flex',
                    flexDirection: 'row', 
                    alignItems: 'center',
                    marginTop:'2vh'
                    }}>
                <CancelIcon sx={{color:'red',marginRight:'1vw'}}/> 
                <CheckCircleIcon sx={{color:'#25D366'}}/> 
                </Box>
       </Box>

       {/* ------------------------------ */}
       <br />
       {/* ------------------------------------- */}

        {/* Box 2 */}
            <Box sx={{     
                backgroundColor:'#90A9DF', 
                border:'1px solid black',
                width:'36vw',
                height:'36vw',    
                display: 'flex',
                flexDirection: 'column', 
                alignItems: 'center',
                borderRadius:'12px', 
                overflowY: 'auto',
                // overflowX: 'none',
                '&::-webkit-scrollbar': {
                    display: 'none', // Hide scrollbar for Webkit browsers
                },
                msOverflowStyle: 'none', // Hide scrollbar 
            }}>
            
                    <Box
                    sx={{ display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                        
                            }} >
                        
                    <Typography 
                        variant="body1"
                        sx={{ fontSize: 14,width:'100%', direction:'rtl',marginTop:'1vh', marginLeft:'9vw'}}>
                                    {"כתובת:"}
                    </Typography>
                

                    <IconButton sx={{marginLeft:'2vw'}}>
                                <ChevronRightIcon fontSize="small"  />
                                </IconButton>
                                
                        </Box>
            
                    <Typography 
                        variant="body2"
                        sx={{ fontSize: 13,width:'100%'  }}>
                                
                                    {'קרית טבעון, מרדכי טננבויים, 44'}
                    </Typography>
                    <Divider sx={{ borderColor: 'white', width: '80%', marginBottom:'0.5vh',marginTop:'2vh'}} />
                    <Typography 
                    variant="body1"
                        sx={{ fontSize: 14,width:'100%', direction:'rtl',marginTop:'1vh'}}>
                                    {"תיאור:"}
                    </Typography>

                    <Typography 
                        variant="caption"
                        sx={{ fontSize: 12,width:'100%'}}>
                                
                            {"היי אני דרור כהן, אוהבת מאוד ילדים ולנקות 😊. מעוניינת לעזור ולתרום בניקיונות ,שותפות ובייביסיטר ריאח"}
                    </Typography>
            
            </Box>
       {/* </Box> */}
     </>
        
    


  )
}
