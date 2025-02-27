import axios from 'axios';
import { type AdResponseType, fetchAd } from './fetchAd';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchAd', () => {
  const mockResponse: AdResponseType = {
    code: 0,
    msg: 'OK',
    result: {
      unit: 'PUBLIC_TEST_UNIT_ID_375_80',
      format: 'banner',
      w: 375,
      h: 80,
      creativeId: 'test_creative',
      ad: '<div style=\'height:100%;\'><a class="class-a5ada9fa9942a4ef741f" rel="noopener noreferrer" target="_blank" href="https://adrop.io" style="width:100%;height:100%;display:flex;justify-content:center;align-items:center"><img id="a5ada9fa9942a4ef741f" onclick=\'fetch("https://api-v2.adrop.io/invoke?action=AD_CLICK&txid=01HDZFM5ZWN84Z3Q6ZZWT2V2BD:01HD5G6FV2MV6ERF3P1DMARTIN:01JN4N25D0R9PY1306E1RPA82W&auid=01HD5Q3Z8GXNNWF464CNWCMBS4:01HFBMMGFFWQNN2NZVJB5NFPVZ:2ad3a8041993c7302d1cdd707ede43054d4bde4f648abaf03ac8159e8d2b2573&unit=PUBLIC_TEST_UNIT_ID_375_80")\' onload=\'(function(){let invoked=!1;const observer=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&!invoked&&(invoked=!0,fetch("https://api-v2.adrop.io/invoke?action=AD_IMPR&txid=01HDZFM5ZWN84Z3Q6ZZWT2V2BD:01HD5G6FV2MV6ERF3P1DMARTIN:01JN4N25D0R9PY1306E1RPA82W&auid=01HD5Q3Z8GXNNWF464CNWCMBS4:01HFBMMGFFWQNN2NZVJB5NFPVZ:2ad3a8041993c7302d1cdd707ede43054d4bde4f648abaf03ac8159e8d2b2573&unit=PUBLIC_TEST_UNIT_ID_375_80"))})},{root:null,rootMargin:"0px",threshold:.5});let element=document.getElementById("a5ada9fa9942a4ef741f");element && observer.observe(element);}).call(this)\' src="https://storage.adrop.io/public/test_templates/Banner_375x80.png" alt="Test Banner 375x80" style="width:100%;height:100%;object-fit:contain"/></a></div>',
    },
  };

  test('성공적으로 광고를 가져옵니다', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockResponse });

    const result = await fetchAd({
      unit_id: 'PUBLIC_TEST_UNIT_ID_375_80',
      pf: 'web',
      lcl: 'ko_KR',
    });

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining(
        'https://api-v2.adrop.io/request?unit=PUBLIC_TEST_UNIT_ID_375_80'
      )
    );
    expect(result).toEqual(mockResponse);
    expect(result.result.ad).toContain(
      '<div style=\'height:100%;\'><a class="class-a5ada9fa9942a4ef741f"'
    );
  });

  test('API 호출 실패 시 에러를 던집니다', async () => {
    mockedAxios.get.mockRejectedValue(new Error('API call failed'));

    await expect(
      fetchAd({ unit_id: 'PUBLIC_TEST_UNIT_ID_375_80' })
    ).rejects.toThrow('Failed to fetch ad');
  });
});
