/**
 * @Author: ToFishes
 *
 * @Version: v1.1 
 *
 * @Description: 
 *  省市联动对象，usage：
 *  var chain = new LocationChain({
 *      province: $('#province'),
 *      city: $('#city'),
 *      region: $('#region'),   //区，可选（不需要时不做配置即可）
 *      provinceDefaultOption: '<option value="">省/直辖市</option>',
 *      cityDefalutOption: '<option value="">不限</option>',
 *      regionDefaultOption: '<option value="">不限</option>',       //区默认选项，可选（不需要时不做配置即可）
 *      init: '11-5-1', //初始化指定省市（区），传数据对应id，格式： provinceId-cityId(-regionId)
 *      onchange: function() {} //change回调
 *  });
 *  chain.initialize();
 *
 * @Change records:
 *  v1.0 二级联动改为三级联动 2014.02.11 @xiaohai;
 *  v1.1 更新了省市数据 2014.11.25 @xiaohai;
 */

function LocationChain(args) {
    this.$province = args.province || $();
    this.$city = args.city || $();
    this.$region = args.region || $();
    this.provinceDefaultOption = args.provinceDefaultOption || '';
    this.cityDefalutOption = args.cityDefalutOption || '';
    this.regionDefaultOption = args.regionDefaultOption || '';
    this.onchange = args.onchange || function() {};
    /*
     * value is id, id start from 1
     * init = {
     *      province: 11,
     *      city: 2,
     *      region: 3
     * }
     */
    this.init = {};
    if (args.init) {
        var initIds = args.init.split('-');
        var typeIds = {
            0: 'province',
            1: 'city',
            2: 'region'
        };
        for (var index = 0, length = initIds.length; index < length; index++) {
            this.init[typeIds[index]] = initIds[index];
        }
    }
};
/**
 *  @author ToFishes
 *  @descript 设置下拉选项，
 *  @param pid 可选参数，初始省id
 *  @param cid 可选参数，初始市id或表示获取市级列表
 *  @param rid 可选参数，初始区县id或表示获取区级列表
 */
LocationChain.prototype.getOpts = function(pid, cid, rid) {
    var _this = this,
        isCity = arguments.length === 2,
        isRegion = arguments.length === 3,
        defaultOpt;

    if(isCity){
        defaultOpt = _this.cityDefalutOption;
    }else if(isRegion){
        defaultOpt = _this.regionDefaultOption;
    }else{
        defaultOpt = _this.provinceDefaultOption;
    }

    //如果未提供省id，则城市直接返回默认项目
    if (isCity && !pid) {
        return defaultOpt;
    };
    if (isRegion && !cid) {
        return defaultOpt;
    };

    var opts = [defaultOpt],
        dataMap = {};

    if(isCity){
        dataMap = locationMap[pid] ? locationMap[pid].cities : {};
    }else if(isRegion){
         dataMap = (locationMap[pid] && locationMap[pid].cities[cid]) ? locationMap[pid].cities[cid].regions : {};
    }else{
        dataMap = locationMap;
    }

    var initId = -1;
    if (arguments.length === 2) {
        initId = cid;
    } else if (arguments.length === 3){
        initId = rid;
    } else {
        initId = pid;
    };

    for (var id in dataMap) {
        opts.push('<option value="', id, '"', initId == id ? ' selected="selected" ' : '', '>', dataMap[id].name || dataMap[id], '</option>');
    };
    return opts.join('');
};
/**
 *  @author ToFishes
 *  @descript 初始化，如有初始值，则默认选中，否则只显示。
 */
LocationChain.prototype.initialize = function() {
    var _this = this;

    var provinceOpts = _this.getOpts(_this.init.province);
    var cityOpts = _this.getOpts(_this.init.province, _this.init.city);
    var regionOpts = _this.getOpts(_this.init.province, _this.init.city, _this.init.region);

    _this.$province.html(provinceOpts);
    _this.$city.html(cityOpts);
    _this.$region.html(regionOpts);

    _this.$province.unbind('change.chain').bind('change.chain', function() {
        var $this = $(this);
        var pid = $this.val();

        _this.$city.html(_this.getOpts(pid, null));
        _this.$region.html(_this.getOpts(pid, null, null));
    });

    _this.$city.unbind('change.chain').bind('change.chain', function() {
        var $this = $(this);
        var pid = _this.$province.val();
        var cid = $this.val();

        _this.$region.html(_this.getOpts(pid, cid, null));
    });
};

/**
 * @author ToFishes
 * 旧的调用方法，为了兼容，重新封装，使用新方式
 */

//@xiaohai 2014.2.12 没有支持三级联动
function initProvinceData(selElm, subElm) {

    var $province = $('#' + selElm),
        $city = $('#' + subElm);
    var pid = $province.attr('preval'),
        cid = $city.attr('preval');

    var args = {
        province: $province,
        city: $city,
        init: pid + '-' + cid,
        provinceDefaultOption: '<option value="">不限</option>',
        cityDefalutOption: '<option value="">不限</option>'
    };
    //对于不同的情况，给不同的默认选项
    if (km.settings) {
        args.provinceDefaultOption = '';
        args.cityDefalutOption = '';
    };

    var chain = new LocationChain(args);

    chain.initialize();
}

var locationData = {
    'provinces': [{
        'id': 11,
        'name': '北京',
        'citys': [{
            'id': 1,
            'name': '东城区',
            'regions':[]
        }, {
            'id': 2,
            'name': '西城区',
            'regions':[]
        }, {
            'id': 3,
            'name': '崇文区',
            'regions':[]
        }, {
            'id': 4,
            'name': '宣武区',
            'regions':[]
        }, {
            'id': 5,
            'name': '朝阳区',
            'regions':[]
        }, {
            'id': 6,
            'name': '丰台区',
            'regions':[]
        }, {
            'id': 7,
            'name': '石景山区',
            'regions':[]
        }, {
            'id': 8,
            'name': '海淀区',
            'regions':[]
        }, {
            'id': 9,
            'name': '门头沟区',
            'regions':[]
        }, {
            'id': 11,
            'name': '京东燕郊经济技术开发区',
            'regions':[]
        }, {
            'id': 12,
            'name': '通州区',
            'regions':[]
        }, {
            'id': 13,
            'name': '顺义区',
            'regions':[]
        }, {
            'id': 14,
            'name': '昌平区',
            'regions':[]
        }, {
            'id': 15,
            'name': '大兴区',
            'regions':[]
        }, {
            'id': 16,
            'name': '怀柔区',
            'regions':[]
        }, {
            'id': 17,
            'name': '平谷区',
            'regions':[]
        }, {
            'id': 28,
            'name': '密云县',
            'regions':[]
        }, {
            'id': 29,
            'name': '延庆县',
            'regions':[]
        }, {
            'id': 10,
            'name': '其它',
            'regions':[]
        }]
    }, {
        'id': 12,
        'name': '天津',
        'citys': [{
            'id': 1,
            'name': '和平区',
            'regions': []
        }, {
            'id': 2,
            'name': '河东区',
            'regions': []
        }, {
            'id': 3,
            'name': '河西区',
            'regions': []
        }, {
            'id': 4,
            'name': '南开区',
            'regions': []
        }, {
            'id': 5,
            'name': '河北区',
            'regions': []
        }, {
            'id': 6,
            'name': '红桥区',
            'regions': []
        }, {
            'id': 7,
            'name': '塘沽区',
            'regions': []
        }, {
            'id': 8,
            'name': '汉沽区',
            'regions': []
        }, {
            'id': 9,
            'name': '大港区',
            'regions': []
        }, {
            'id': 10,
            'name': '东丽区',
            'regions': []
        }, {
            'id': 11,
            'name': '西青区',
            'regions': []
        }, {
            'id': 12,
            'name': '津南区',
            'regions': []
        }, {
            'id': 13,
            'name': '北辰区',
            'regions': []
        }, {
            'id': 14,
            'name': '武清区',
            'regions': []
        }, {
            'id': 15,
            'name': '宝坻区',
            'regions': []
        }, {
            'id': 21,
            'name': '宁河县',
            'regions': []
        }, {
            'id': 23,
            'name': '静海县',
            'regions': []
        }, {
            'id': 25,
            'name': '蓟县',
            'regions': []
        },{
            'id': 24,
            'name': '滨海新区',
            'regions': []
        },{
            'id': 25,
            'name': '其它',
            'regions':[]
        }]
    }, {
        'id': 13,
        'name': '河北',
        'citys': [{
            'id': 1,
            'name': '石家庄',
            'regions': [{
                            '1': '长安区'
                        },
                        {
                            '2': '桥东区'
                        },
                        {
                            '3': '桥西区'
                        },
                        {
                            '4': '新华区'
                        },
                        {
                            '5': '井陉矿区'
                        },
                        {
                            '6': '裕华区'
                        },
                        {
                            '7': '井陉县'
                        },
                        {
                            '8': '正定县'
                        },
                        {
                            '9': '栾城县'
                        },
                        {
                            '10': '行唐县'
                        },
                        {
                            '11': '灵寿县'
                        },
                        {
                            '12': '高邑县'
                        },
                        {
                            '13': '深泽县'
                        },
                        {
                            '14': '赞皇县'
                        },
                        {
                            '15': '无极县'
                        },
                        {
                            '16': '平山县'
                        },
                        {
                            '17': '元氏县'
                        },
                        {
                            '18': '赵县'
                        },
                        {
                            '19': '辛集市'
                        },
                        {
                            '20': '藁城市'
                        },
                        {
                            '21': '晋州市'
                        },
                        {
                            '22': '新乐市'
                        },
                        {
                            '23': '鹿泉市'
                        },
                        {
                            '24': '高新区'
                        },
                        {
                            '25': '其它'
                        }
            ]
        }, {
            'id': 2,
            'name': '唐山',
            'regions': [{
                            '1': '路南区'
                        },
                        {
                            '2': '路北区'
                        },
                        {
                            '3': '古冶区'
                        },
                        {
                            '4': '开平区'
                        },
                        {
                            '5': '丰南区'
                        },
                        {
                            '6': '丰润区'
                        },
                        {
                            '7': '滦县'
                        },
                        {
                            '8': '滦南县'
                        },
                        {
                            '9': '乐亭县'
                        },
                        {
                            '10': '迁西县'
                        },
                        {
                            '11': '玉田县'
                        },
                        {
                            '12': '唐海县'
                        },
                        {
                            '13': '遵化市'
                        },
                        {
                            '14': '迁安市'
                        },{
                            '15': '新区'
                        },{
                            '16': '高新技术开发区'
                        },
                        {
                            '17': '其它'
                        }
            ]
        }, {
            'id': 3,
            'name': '秦皇岛',
            'regions': [{
                            '1': '海港区'
                        },
                        {
                            '2': '山海关区'
                        },
                        {
                            '3': '北戴河区'
                        },
                        {
                            '4': '青龙满族自治县'
                        },
                        {
                            '5': '昌黎县'
                        },
                        {
                            '6': '抚宁县'
                        },
                        {
                            '7': '卢龙县'
                        },{
                            '8': '经济技术开发区'
                        },{
                            '9': '其它'
                        }]
        }, {
            'id': 4,
            'name': '邯郸',
            'regions': [{
                            '1': '邯山区'
                        },
                        {
                            '2': '丛台区'
                        },
                        {
                            '3': '复兴区'
                        },
                        {
                            '4': '峰峰矿区'
                        },
                        {
                            '5': '邯郸县'
                        },
                        {
                            '6': '临漳县'
                        },
                        {
                            '7': '成安县'
                        },
                        {
                            '8': '大名县'
                        },
                        {
                            '9': '涉县'
                        },
                        {
                            '10': '磁县'
                        },
                        {
                            '11': '肥乡县'
                        },
                        {
                            '12': '永年县'
                        },
                        {
                            '13': '邱县'
                        },
                        {
                            '14': '鸡泽县'
                        },
                        {
                            '15': '广平县'
                        },
                        {
                            '16': '馆陶县'
                        },
                        {
                            '17': '魏县'
                        },
                        {
                            '18': '曲周县'
                        },
                        {
                            '19': '武安市'
                        },
                        {
                            '20': '邯郸市经济技术开发区'
                        },
                        {
                            '21': '其他区'
                        }]
        }, {
            'id': 5,
            'name': '邢台',
            'regions': [{
                            '1': '桥东区'
                        },
                        {
                            '2': '桥西区'
                        },
                        {
                            '3': '邢台县'
                        },
                        {
                            '4': '临城县'
                        },
                        {
                            '5': '内丘县'
                        },
                        {
                            '6': '柏乡县'
                        },
                        {
                            '7': '隆尧县'
                        },
                        {
                            '8': '任县'
                        },
                        {
                            '9': '南和县'
                        },
                        {
                            '10': '宁晋县'
                        },
                        {
                            '11': '巨鹿县'
                        },
                        {
                            '12': '新河县'
                        },
                        {
                            '13': '广宗县'
                        },
                        {
                            '14': '平乡县'
                        },
                        {
                            '15': '威县'
                        },
                        {
                            '16': '清河县'
                        },
                        {
                            '17': '临西县'
                        },
                        {
                            '18': '南宫市'
                        },
                        {
                            '19': '沙河市'
                        },{
                            '20': '其它'
                        }]
        }, {
            'id': 6,
            'name': '保定',
            'regions': [{
                            '1': '新市区'
                        },
                        {
                            '2': '北市区'
                        },
                        {
                            '3': '南市区'
                        },
                        {
                            '4': '满城县'
                        },
                        {
                            '5': '清苑县'
                        },
                        {
                            '6': '涞水县'
                        },
                        {
                            '7': '阜平县'
                        },
                        {
                            '8': '徐水县'
                        },
                        {
                            '9': '定兴县'
                        },
                        {
                            '10': '唐县'
                        },
                        {
                            '11': '高阳县'
                        },
                        {
                            '12': '容城县'
                        },
                        {
                            '13': '涞源县'
                        },
                        {
                            '14': '望都县'
                        },
                        {
                            '15': '安新县'
                        },
                        {
                            '16': '易县'
                        },
                        {
                            '17': '曲阳县'
                        },
                        {
                            '18': '蠡县'
                        },
                        {
                            '19': '顺平县'
                        },
                        {
                            '20': '博野县'
                        },
                        {
                            '21': '雄县'
                        },
                        {
                            '22': '涿州市'
                        },
                        {
                            '23': '定州市'
                        },
                        {
                            '24': '安国市'
                        },
                        {
                            '25': '高碑店市'
                        },{
                            '26': '其它'
                        }]
        }, {
            'id': 7,
            'name': '张家口',
            'regions': [{
                            '1': '桥东区'
                        },
                        {
                            '2': '桥西区'
                        },
                        {
                            '3': '宣化区'
                        },
                        {
                            '4': '下花园区'
                        },
                        {
                            '5': '宣化县'
                        },
                        {
                            '6': '张北县'
                        },
                        {
                            '7': '康保县'
                        },
                        {
                            '8': '沽源县'
                        },
                        {
                            '9': '尚义县'
                        },
                        {
                            '10': '蔚县'
                        },
                        {
                            '11': '阳原县'
                        },
                        {
                            '12': '怀安县'
                        },
                        {
                            '13': '万全县'
                        },
                        {
                            '14': '怀来县'
                        },
                        {
                            '15': '涿鹿县'
                        },
                        {
                            '16': '赤城县'
                        },
                        {
                            '17': '崇礼县'
                        },{
                            '18': '其它'
                        }]
        }, {
            'id': 8,
            'name': '承德',
            'regions': [{
                            '1': '双桥区'
                        },
                        {
                            '2': '双滦区'
                        },
                        {
                            '3': '鹰手营子矿区'
                        },
                        {
                            '4': '承德县'
                        },
                        {
                            '5': '兴隆县'
                        },
                        {
                            '6': '平泉县'
                        },
                        {
                            '7': '滦平县'
                        },
                        {
                            '8': '隆化县'
                        },
                        {
                            '9': '丰宁满族自治县'
                        },
                        {
                            '10': '宽城满族自治县'
                        },
                        {
                            '11': '围场满族蒙古族自治县'
                        },{
                            '12': '其它'
                        }]
        }, {
            'id': 9,
            'name': '沧州',
            'regions': [{
                            '1': '新华区'
                        },
                        {
                            '2': '运河区'
                        },
                        {
                            '3': '沧县'
                        },
                        {
                            '4': '青县'
                        },
                        {
                            '5': '东光县'
                        },
                        {
                            '6': '海兴县'
                        },
                        {
                            '7': '盐山县'
                        },
                        {
                            '8': '肃宁县'
                        },
                        {
                            '9': '南皮县'
                        },
                        {
                            '10': '吴桥县'
                        },
                        {
                            '11': '献县'
                        },
                        {
                            '12': '孟村回族自治县'
                        },
                        {
                            '13': '泊头市'
                        },
                        {
                            '14': '任丘市'
                        },
                        {
                            '15': '沧州市经济技术开发区'
                        },
                        {
                            '16': '河间市'
                        },
                        {
                            '17': '黄骅市'
                        },{
                            '18': '其它'
                        }]
        }, {
            'id': 10,
            'name': '廊坊',
            'regions': [{
                            '1': '安次区'
                        },
                        {
                            '2': '广阳区'
                        },
                        {
                            '3': '固安县'
                        },
                        {
                            '4': '永清县'
                        },
                        {
                            '5': '香河县'
                        },
                        {
                            '6': '大城县'
                        },
                        {
                            '7': '文安县'
                        },
                        {
                            '8': '大厂回族自治县'
                        },
                        {
                            '9': '霸州市'
                        },
                        {
                            '10': '三河市'
                        },
                        {
                            '11': '燕郊经济技术开发区'
                        },
                        {
                            '12': '开发区'
                        },
                        {
                            '13': '廊坊经济技术开发区'
                        },{
                            '14': '其它'
                        }]
        }, {
            'id': 11,
            'name': '衡水',
            'regions': [{
                            '1': '桃城区'
                        },
                        {
                            '2': '枣强县'
                        },
                        {
                            '3': '武邑县'
                        },
                        {
                            '4': '武强县'
                        },
                        {
                            '5': '饶阳县'
                        },
                        {
                            '6': '安平县'
                        },
                        {
                            '7': '故城县'
                        },
                        {
                            '8': '景县'
                        },
                        {
                            '9': '阜城县'
                        },
                        {
                            '10': '冀州市'
                        },
                        {
                            '11': '深州市'
                        },
                        {
                            '12': '衡水高新技术开发区'
                        },{
                            '13': '其它'
                        }]
        }]
    }, {
        'id': 14,
        'name': '山西',
        'citys': [{
            'id': 1,
            'name': '太原',
            'regions': [{
                            '1': '小店区'
                        },
                        {
                            '2': '迎泽区'
                        },
                        {
                            '3': '杏花岭区'
                        },
                        {
                            '4': '尖草坪区'
                        },
                        {
                            '5': '万柏林区'
                        },
                        {
                            '6': '晋源区'
                        },
                        {
                            '7': '清徐县'
                        },
                        {
                            '8': '阳曲县'
                        },
                        {
                            '9': '娄烦县'
                        },
                        {
                            '10': '古交市'
                        },
                        {
                            '11': '高新技术产业开发区'
                        },
                        {
                            '12': '其他区'
                        }]
        }, {
            'id': 2,
            'name': '大同',
            'regions': [{
                            '1': '城区'
                        },
                        {
                            '2': '矿区'
                        },
                        {
                            '3': '南郊区'
                        },
                        {
                            '4': '新荣区'
                        },
                        {
                            '5': '阳高县'
                        },
                        {
                            '6': '天镇县'
                        },
                        {
                            '7': '广灵县'
                        },
                        {
                            '8': '灵丘县'
                        },
                        {
                            '9': '浑源县'
                        },
                        {
                            '10': '左云县'
                        },
                        {
                            '11': '大同县'
                        },
                        {
                            '12': '其它'
                        }]
        }, {
            'id': 3,
            'name': '阳泉',
            'regions': [{
                            '1': '城区'
                        },
                        {
                            '2': '矿区'
                        },
                        {
                            '3': '郊区'
                        },
                        {
                            '4': '平定县'
                        },
                        {
                            '5': '盂县'
                        },
                        {
                            '6': '其他区'
                        }]
        }, {
            'id': 4,
            'name': '长治',
            'regions': [{
                            '1': '城区'
                        },
                        {
                            '2': '郊区'
                        },
                        {
                            '3': '长治县'
                        },
                        {
                            '4': '襄垣县'
                        },
                        {
                            '5': '屯留县'
                        },
                        {
                            '6': '平顺县'
                        },
                        {
                            '7': '黎城县'
                        },
                        {
                            '8': '壶关县'
                        },
                        {
                            '9': '长子县'
                        },
                        {
                            '10': '武乡县'
                        },
                        {
                            '11': '沁县'
                        },
                        {
                            '12': '沁源县'
                        },
                        {
                            '13': '潞城市'
                        },
                        {
                            '14': '高新区'
                        },
                        {
                            '15': '其它'
                        }]
        }, {
            'id': 5,
            'name': '晋城',
            'regions': [{
                            '1': '城区'
                        },
                        {
                            '2': '沁水县'
                        },
                        {
                            '3': '阳城县'
                        },
                        {
                            '4': '陵川县'
                        },
                        {
                            '5': '泽州县'
                        },
                        {
                            '6': '高平市'
                        },
                        {
                            '7': '其它'
                        }]
        }, {
            'id': 6,
            'name': '朔州',
            'regions': [{
                            '1': '朔城区'
                        },
                        {
                            '2': '平鲁区'
                        },
                        {
                            '3': '山阴县'
                        },
                        {
                            '4': '应县'
                        },
                        {
                            '5': '右玉县'
                        },
                        {
                            '6': '怀仁县'
                        },
                        {
                            '7': '其它'
                        }]
        }, {
            'id': 7,
            'name': '晋中',
            'regions': [{
                            '1': '榆次区'
                        },
                        {
                            '2': '榆社县'
                        },
                        {
                            '3': '左权县'
                        },
                        {
                            '4': '和顺县'
                        },
                        {
                            '5': '昔阳县'
                        },
                        {
                            '6': '寿阳县'
                        },
                        {
                            '7': '太谷县'
                        },
                        {
                            '8': '祁县'
                        },
                        {
                            '9': '平遥县'
                        },
                        {
                            '10': '灵石县'
                        },
                        {
                            '11': '介休市'
                        },
                        {
                            '12': '其它'
                        }]
        }, {
            'id': 8,
            'name': '运城',
            'regions': [{
                            '1': '盐湖区'
                        },
                        {
                            '2': '临猗县'
                        },
                        {
                            '3': '万荣县'
                        },
                        {
                            '4': '闻喜县'
                        },
                        {
                            '5': '稷山县'
                        },
                        {
                            '6': '新绛县'
                        },
                        {
                            '7': '绛县'
                        },
                        {
                            '8': '垣曲县'
                        },
                        {
                            '9': '夏县'
                        },
                        {
                            '10': '平陆县'
                        },
                        {
                            '11': '芮城县'
                        },
                        {
                            '12': '永济市'
                        },
                        {
                            '13': '河津市'
                        },
                        {
                            '14': '其它'
                        }]
        }, {
            'id': 9,
            'name': '忻州',
            'regions': [{
                            '1': '忻府区'
                        },
                        {
                            '2': '定襄县'
                        },
                        {
                            '3': '五台县'
                        },
                        {
                            '4': '代县'
                        },
                        {
                            '5': '繁峙县'
                        },
                        {
                            '6': '宁武县'
                        },
                        {
                            '7': '静乐县'
                        },
                        {
                            '8': '神池县'
                        },
                        {
                            '9': '五寨县'
                        },
                        {
                            '10': '岢岚县'
                        },
                        {
                            '11': '河曲县'
                        },
                        {
                            '12': '保德县'
                        },
                        {
                            '13': '偏关县'
                        },
                        {
                            '14': '原平市'
                        },
                        {
                            '15': '其它'
                        }]
        }, {
            'id': 10,
            'name': '临汾',
            'regions': [{
                            '1': '尧都区'
                        },
                        {
                            '2': '曲沃县'
                        },
                        {
                            '3': '翼城县'
                        },
                        {
                            '4': '襄汾县'
                        },
                        {
                            '5': '洪洞县'
                        },
                        {
                            '6': '古县'
                        },
                        {
                            '7': '安泽县'
                        },
                        {
                            '8': '浮山县'
                        },
                        {
                            '9': '吉县'
                        },
                        {
                            '10': '乡宁县'
                        },
                        {
                            '11': '大宁县'
                        },
                        {
                            '12': '隰县'
                        },
                        {
                            '13': '永和县'
                        },
                        {
                            '14': '蒲县'
                        },
                        {
                            '15': '汾西县'
                        },
                        {
                            '16': '侯马市'
                        },
                        {
                            '17': '霍州市'
                        },
                        {
                            '18': '其它'
                        }]
        }, {
            'id': 23,
            'name': '吕梁',
            'regions': [{
                            '1': '离石区'
                        },
                        {
                            '2': '文水县'
                        },
                        {
                            '3': '交城县'
                        },
                        {
                            '4': '兴县'
                        },
                        {
                            '5': '临县'
                        },
                        {
                            '6': '柳林县'
                        },
                        {
                            '7': '石楼县'
                        },
                        {
                            '8': '岚县'
                        },
                        {
                            '9': '方山县'
                        },
                        {
                            '10': '中阳县'
                        },
                        {
                            '11': '交口县'
                        },
                        {
                            '12': '孝义市'
                        },
                        {
                            '13': '汾阳市'
                        },
                        {
                            '14': '其它'
                        }]
        }]
    }, {
        'id': 15,
        'name': '内蒙古',
        'citys': [{
            'id': 1,
            'name': '呼和浩特',
            'regions': [{
                            '1': '新城区'
                        },
                        {
                            '2': '回民区'
                        },
                        {
                            '3': '玉泉区'
                        },
                        {
                            '4': '赛罕区'
                        },
                        {
                            '5': '土默特左旗'
                        },
                        {
                            '6': '托克托县'
                        },
                        {
                            '7': '和林格尔县'
                        },
                        {
                            '8': '清水河县'
                        },
                        {
                            '9': '武川县'
                        },
                        {
                            '10': '金川开发区'
                        },
                        {
                            '11': '金桥开发区'
                        },
                        {
                            '12': '如意开发区'
                        },
                        {
                            '13': '其它'
                        }]
        }, {
            'id': 2,
            'name': '包头',
            'regions': [{
                            '1': '东河区'
                        },
                        {
                            '2': '昆都仑区'
                        },
                        {
                            '3': '青山区'
                        },
                        {
                            '4': '石拐区'
                        },
                        {
                            '5': '白云矿区'
                        },
                        {
                            '6': '九原区'
                        },
                        {
                            '7': '土默特右旗'
                        },
                        {
                            '8': '固阳县'
                        },
                        {
                            '9': '达尔罕茂明安联合旗'
                        },
                        {
                            '10': '其它'
                        }]
        }, {
            'id': 3,
            'name': '乌海',
            'regions': [{
                            '1': '海勃湾区'
                        },
                        {
                            '2': '海南区'
                        },
                        {
                            '3': '乌达区'
                        },
                        {
                            '4': '其它'
                        }]
        }, {
            'id': 4,
            'name': '赤峰',
            'regions': [{
                            '1': '红山区'
                        },
                        {
                            '2': '元宝山区'
                        },
                        {
                            '3': '松山区'
                        },
                        {
                            '4': '阿鲁科尔沁旗'
                        },
                        {
                            '5': '巴林左旗'
                        },
                        {
                            '6': '巴林右旗'
                        },
                        {
                            '7': '林西县'
                        },
                        {
                            '8': '克什克腾旗'
                        },
                        {
                            '9': '翁牛特旗'
                        },
                        {
                            '10': '喀喇沁旗'
                        },
                        {
                            '11': '宁城县'
                        },
                        {
                            '12': '敖汉旗'
                        },
                        {
                            '13': '其它'
                        }]
        }, {
            'id': 5,
            'name': '通辽',
            'regions': [{
                            '1': '科尔沁区'
                        },
                        {
                            '2': '科尔沁左翼中旗'
                        },
                        {
                            '3': '科尔沁左翼后旗'
                        },
                        {
                            '4': '开鲁县'
                        },
                        {
                            '5': '库伦旗'
                        },
                        {
                            '6': '奈曼旗'
                        },
                        {
                            '7': '扎鲁特旗'
                        },
                        {
                            '8': '霍林郭勒市'
                        },{
                            '9': '其它'
                        }]
        }, {
            'id': 6,
            'name': '鄂尔多斯',
            'regions': [{
                            '1': '东胜区'
                        },
                        {
                            '2': '达拉特旗'
                        },
                        {
                            '3': '准格尔旗'
                        },
                        {
                            '4': '鄂托克前旗'
                        },
                        {
                            '5': '鄂托克旗'
                        },
                        {
                            '6': '杭锦旗'
                        },
                        {
                            '7': '乌审旗'
                        },
                        {
                            '8': '伊金霍洛旗'
                        },{
                            '9': '其它'
                        }]
        }, {
            'id': 7,
            'name': '呼伦贝尔',
            'regions': [{
                            '1': '海拉尔区'
                        },
                        {
                            '2': '阿荣旗'
                        },
                        {
                            '3': '莫力达瓦达斡尔族自治旗'
                        },
                        {
                            '4': '鄂伦春自治旗'
                        },
                        {
                            '5': '鄂温克族自治旗'
                        },
                        {
                            '6': '陈巴尔虎旗'
                        },
                        {
                            '7': '新巴尔虎左旗'
                        },
                        {
                            '8': '新巴尔虎右旗'
                        },
                        {
                            '9': '满洲里市'
                        },
                        {
                            '10': '牙克石市'
                        },
                        {
                            '11': '扎兰屯市'
                        },
                        {
                            '12': '额尔古纳市'
                        },
                        {
                            '13': '根河市'
                        },
                        {
                            '14': '其它'
                        }]
        }, {
            'id': 22,
            'name': '兴安盟',
            'regions': [{
                            '1': '乌兰浩特市'
                        },
                        {
                            '2': '阿尔山市'
                        },
                        {
                            '3': '科尔沁右翼前旗'
                        },
                        {
                            '4': '科尔沁右翼中旗'
                        },
                        {
                            '5': '扎赉特旗'
                        },
                        {
                            '6': '突泉县'
                        },
                        {
                            '7': '其它'
                        }]
        }, {
            'id': 25,
            'name': '锡林郭勒盟',
            'regions': [{
                            '1': '二连浩特市'
                        },
                        {
                            '2': '锡林浩特市'
                        },
                        {
                            '3': '阿巴嘎旗'
                        },
                        {
                            '4': '苏尼特左旗'
                        },
                        {
                            '5': '苏尼特右旗'
                        },
                        {
                            '6': '东乌珠穆沁旗'
                        },
                        {
                            '7': '西乌珠穆沁旗'
                        },
                        {
                            '8': '太仆寺旗'
                        },
                        {
                            '9': '镶黄旗'
                        },
                        {
                            '10': '正镶白旗'
                        },
                        {
                            '11': '正蓝旗'
                        },
                        {
                            '12': '多伦县'
                        },
                        {
                            '13': '其它'
                        }]
        }, {
            'id': 26,
            'name': '乌兰察布市',
            'regions': [{
                            '1': '集宁区'
                        },
                        {
                            '2': '卓资县'
                        },
                        {
                            '3': '化德县'
                        },
                        {
                            '4': '商都县'
                        },
                        {
                            '5': '兴和县'
                        },
                        {
                            '6': '凉城县'
                        },
                        {
                            '7': '察哈尔右翼前旗'
                        },
                        {
                            '8': '察哈尔右翼中旗'
                        },
                        {
                            '9': '察哈尔右翼后旗'
                        },
                        {
                            '10': '四子王旗'
                        },
                        {
                            '11': '丰镇市'
                        },
                        {
                            '12': '其它'
                        }]
        }, {
            'id': 28,
            'name': '巴彦淖尔市',
            'regions': [{
                            '1': '临河区'
                        },
                        {
                            '2': '五原县'
                        },
                        {
                            '3': '磴口县'
                        },
                        {
                            '4': '乌拉特前旗'
                        },
                        {
                            '5': '乌拉特中旗'
                        },
                        {
                            '6': '乌拉特后旗'
                        },
                        {
                            '7': '杭锦后旗'
                        },
                        {
                            '8': '其它'
                        }]
        }, {
            'id': 29,
            'name': '阿拉善盟',
            'regions': [{
                            '1': '阿拉善左旗'
                        },
                        {
                            '2': '阿拉善右旗'
                        },
                        {
                            '3': '额济纳旗'
                        },
                        {
                            '4': '其它'
                        }]
        }]
    }, {
        'id': 21,
        'name': '辽宁',
        'citys': [{
            'id': 1,
            'name': '沈阳',
            'regions': [{
                            '1': '和平区'
                        },
                        {
                            '2': '沈河区'
                        },
                        {
                            '3': '大东区'
                        },
                        {
                            '4': '皇姑区'
                        },
                        {
                            '5': '铁西区'
                        },
                        {
                            '6': '苏家屯区'
                        },
                        {
                            '7': '东陵区'
                        },
                        {
                            '8': '浑南新区'
                        },
                        {
                            '9': '于洪区'
                        },
                        {
                            '10': '辽中县'
                        },
                        {
                            '11': '康平县'
                        },
                        {
                            '12': '法库县'
                        },
                        {
                            '13': '新民市'
                        },
                        {
                            '14': '沈北新区'
                        },{
                            '15': '其它'
                        }]
        }, {
            'id': 2,
            'name': '大连',
            'regions': [{
                            '1': '中山区'
                        },
                        {
                            '2': '西岗区'
                        },
                        {
                            '3': '沙河口区'
                        },
                        {
                            '4': '甘井子区'
                        },
                        {
                            '5': '旅顺口区'
                        },
                        {
                            '6': '金州区'
                        },
                        {
                            '7': '长海县'
                        },
                        {
                            '8': '瓦房店市'
                        },
                        {
                            '9': '普兰店市'
                        },
                        {
                            '10': '庄河市'
                        },
                        {
                            '11': '经济技术开发区'
                        },{
                            '12': '其它'
                        }]
        }, {
            'id': 3,
            'name': '鞍山',
            'regions': [{
                            '1': '铁东区'
                        },
                        {
                            '2': '铁西区'
                        },
                        {
                            '3': '立山区'
                        },
                        {
                            '4': '千山区'
                        },
                        {
                            '5': '台安县'
                        },
                        {
                            '6': '岫岩满族自治县'
                        },
                        {
                            '7': '海城市'
                        },
                        {
                            '8': '鞍山经济开发区'
                        },{
                            '9': '其它'
                        }]
        }, {
            'id': 4,
            'name': '抚顺',
            'regions': [{
                            '1': '新抚区'
                        },
                        {
                            '2': '东洲区'
                        },
                        {
                            '3': '望花区'
                        },
                        {
                            '4': '顺城区'
                        },
                        {
                            '5': '抚顺县'
                        },
                        {
                            '6': '新宾满族自治县'
                        },
                        {
                            '7': '清原满族自治县'
                        },
                        {
                            '8': '高湾经济开发区'
                        },
                        {
                            '9': '高湾经济开发区'
                        },
                        {
                            '10': '李石经济开发区'
                        },{
                            '11': '其它'
                        }]
        }, {
            'id': 5,
            'name': '本溪',
            'regions': [{
                            '1': '平山区'
                        },
                        {
                            '2': '溪湖区'
                        },
                        {
                            '3': '明山区'
                        },
                        {
                            '4': '南芬区'
                        },
                        {
                            '5': '本溪满族自治县'
                        },
                        {
                            '6': '桓仁满族自治县'
                        },{
                            '7': '其它'
                        }]
        }, {
            'id': 6,
            'name': '丹东',
            'regions': [{
                            '1': '元宝区'
                        },
                        {
                            '2': '振兴区'
                        },
                        {
                            '3': '振安区'
                        },
                        {
                            '4': '宽甸满族自治县'
                        },
                        {
                            '5': '东港市'
                        },
                        {
                            '6': '凤城市'
                        },{
                            '7': '其它'
                        }]
        }, {
            'id': 7,
            'name': '锦州',
            'regions': [{
                            '1': '古塔区'
                        },
                        {
                            '2': '凌河区'
                        },
                        {
                            '3': '太和区'
                        },
                        {
                            '4': '黑山县'
                        },
                        {
                            '5': '义县'
                        },
                        {
                            '6': '凌海市'
                        },
                        {
                            '7': '北宁市'
                        },
                        {
                            '8': '凌河新区'
                        },
                        {
                            '9': '淩南新区'
                        },{
                            '10': '其它'
                        }]
        }, {
            'id': 8,
            'name': '营口',
            'regions': [{
                            '1': '站前区'
                        },
                        {
                            '2': '西市区'
                        },
                        {
                            '3': '鲅鱼圈区'
                        },
                        {
                            '4': '老边区'
                        },
                        {
                            '5': '盖州市'
                        },
                        {
                            '6': '大石桥市'
                        },{
                            '7': '其它'
                        }]
        }, {
            'id': 9,
            'name': '阜新',
            'regions': [{
                            '1': '海州区'
                        },
                        {
                            '2': '新邱区'
                        },
                        {
                            '3': '太平区'
                        },
                        {
                            '4': '清河门区'
                        },
                        {
                            '5': '细河区'
                        },
                        {
                            '6': '阜新蒙古族自治县'
                        },
                        {
                            '7': '彰武县'
                        },{
                            '8': '其它'
                        }]
        }, {
            'id': 10,
            'name': '辽阳',
            'regions': [{
                            '1': '白塔区'
                        },
                        {
                            '2': '文圣区'
                        },
                        {
                            '3': '宏伟区'
                        },
                        {
                            '4': '弓长岭区'
                        },
                        {
                            '5': '太子河区'
                        },
                        {
                            '6': '辽阳县'
                        },
                        {
                            '7': '灯塔市'
                        },{
                            '8': '其它'
                        }]
        }, {
            'id': 11,
            'name': '盘锦',
            'regions': [{
                            '1': '双台子区'
                        },
                        {
                            '2': '兴隆台区'
                        },
                        {
                            '3': '大洼县'
                        },
                        {
                            '4': '盘山县'
                        },
                        {
                            '5': '盘锦经济开发区'
                        },{
                            '6': '其它'
                        }]
        }, {
            'id': 12,
            'name': '铁岭',
            'regions': [{
                            '1': '银州区'
                        },
                        {
                            '2': '清河区'
                        },
                        {
                            '3': '铁岭县'
                        },
                        {
                            '4': '西丰县'
                        },
                        {
                            '5': '昌图县'
                        },
                        {
                            '6': '调兵山市'
                        },
                        {
                            '7': '开原市'
                        },{
                            '8': '其它'
                        }]
        }, {
            'id': 13,
            'name': '朝阳',
            'regions': [{
                            '1': '双塔区'
                        },
                        {
                            '2': '龙城区'
                        },
                        {
                            '3': '朝阳县'
                        },
                        {
                            '4': '建平县'
                        },
                        {
                            '5': '喀喇沁左翼蒙古族自治县'
                        },
                        {
                            '6': '北票市'
                        },
                        {
                            '7': '凌源市'
                        },{
                            '8': '其它'
                        }]
        }, {
            'id': 14,
            'name': '葫芦岛',
            'regions': [{
                            '1': '连山区'
                        },
                        {
                            '2': '龙港区'
                        },
                        {
                            '3': '南票区'
                        },
                        {
                            '4': '绥中县'
                        },
                        {
                            '5': '建昌县'
                        },
                        {
                            '6': '兴城市'
                        },{
                            '7': '其它'
                        }]
        }]
    }, {
        'id': 22,
        'name': '吉林',
        'citys': [{
            'id': 1,
            'name': '长春',
            'regions': [{
                            '1': '南关区'
                        },
                        {
                            '2': '宽城区'
                        },
                        {
                            '3': '朝阳区'
                        },
                        {
                            '4': '二道区'
                        },
                        {
                            '5': '绿园区'
                        },
                        {
                            '6': '双阳区'
                        },
                        {
                            '7': '农安县'
                        },
                        {
                            '8': '九台市'
                        },
                        {
                            '9': '榆树市'
                        },
                        {
                            '10': '德惠市'
                        },
                        {
                            '11': '净月旅游经济开发区'
                        },
                        {
                            '12': '高新技术产业开发区'
                        },
                        {
                            '13': '其它'
                        }]
        }, {
            'id': 2,
            'name': '吉林市',
            'regions': [{
                            '1': '昌邑区'
                        },
                        {
                            '2': '龙潭区'
                        },
                        {
                            '3': '船营区'
                        },
                        {
                            '4': '丰满区'
                        },
                        {
                            '5': '永吉县'
                        },
                        {
                            '6': '蛟河市'
                        },
                        {
                            '7': '桦甸市'
                        },
                        {
                            '8': '舒兰市'
                        },
                        {
                            '9': '磐石市'
                        },
                        {
                            '10': '高新区'
                        },
                        {
                            '11': '其它'
                        }]
        }, {
            'id': 3,
            'name': '四平',
            'regions': [{
                            '1': '铁西区'
                        },
                        {
                            '2': '铁东区'
                        },
                        {
                            '3': '梨树县'
                        },
                        {
                            '4': '伊通满族自治县'
                        },
                        {
                            '5': '公主岭市'
                        },
                        {
                            '6': '双辽市'
                        },
                        {
                            '7': '其它'
                        }]
        }, {
            'id': 4,
            'name': '辽源',
            'regions': [{
                            '1': '龙山区'
                        },
                        {
                            '2': '西安区'
                        },
                        {
                            '3': '东丰县'
                        },
                        {
                            '4': '东辽县'
                        },
                        {
                            '5': '其它'
                        }]
        }, {
            'id': 5,
            'name': '通化',
            'regions': [{
                            '1': '东昌区'
                        },
                        {
                            '2': '二道江区'
                        },
                        {
                            '3': '通化县'
                        },
                        {
                            '4': '辉南县'
                        },
                        {
                            '5': '柳河县'
                        },
                        {
                            '6': '梅河口市'
                        },
                        {
                            '7': '集安市'
                        },
                        {
                            '8': '其它'
                        }]
        }, {
            'id': 6,
            'name': '白山',
            'regions': [{
                            '1': '八道江区'
                        },
                        {
                            '2': '江源区'
                        },
                        {
                            '3': '抚松县'
                        },
                        {
                            '4': '靖宇县'
                        },
                        {
                            '5': '长白朝鲜族自治县'
                        },
                        {
                            '6': '临江市'
                        },
                        {
                            '7': '其它'
                        }]
        }, {
            'id': 7,
            'name': '松原',
            'regions': [{
                            '1': '宁江区'
                        },
                        {
                            '2': '前郭尔罗斯蒙古族自治县'
                        },
                        {
                            '3': '长岭县'
                        },
                        {
                            '4': '乾安县'
                        },
                        {
                            '5': '扶余县'
                        },
                        {
                            '6': '其它'
                        }]
        }, {
            'id': 8,
            'name': '白城',
            'regions': [{
                            '1': '洮北区'
                        },
                        {
                            '2': '镇赉县'
                        },
                        {
                            '3': '通榆县'
                        },
                        {
                            '4': '洮南市'
                        },
                        {
                            '5': '大安市'
                        },
                        {
                            '6': '其它'
                        }]
        }, {
            'id': 24,
            'name': '延边朝鲜族自治州',
            'regions': [{
                            '1': '延吉市'
                        },
                        {
                            '2': '图们市'
                        },
                        {
                            '3': '敦化市'
                        },
                        {
                            '4': '珲春市'
                        },
                        {
                            '5': '龙井市'
                        },
                        {
                            '6': '和龙市'
                        },
                        {
                            '7': '汪清县'
                        },
                        {
                            '8': '安图县'
                        },{
                            '9': '其它'
                        }]
        }]
    }, {
        'id': 23,
        'name': '黑龙江',
        'citys': [{
            'id': 1,
            'name': '哈尔滨',
            'regions': [{
                            '1': '道里区'
                        },
                        {
                            '2': '南岗区'
                        },
                        {
                            '3': '道外区'
                        },
                        {
                            '4': '平房区'
                        },
                        {
                            '5': '松北区'
                        },
                        {
                            '6': '香坊区'
                        },
                        {
                            '7': '呼兰区'
                        },
                        {
                            '8': '阿城区'
                        },
                        {
                            '9': '依兰县'
                        },
                        {
                            '10': '方正县'
                        },
                        {
                            '11': '宾县'
                        },
                        {
                            '12': '巴彦县'
                        },
                        {
                            '13': '木兰县'
                        },
                        {
                            '14': '通河县'
                        },
                        {
                            '15': '延寿县'
                        },
                        {
                            '16': '双城市'
                        },
                        {
                            '17': '尚志市'
                        },
                        {
                            '18': '五常市'
                        },{
                            '19': '其它'
                        }]
        }, {
            'id': 2,
            'name': '齐齐哈尔',
            'regions': [{
                            '1': '龙沙区'
                        },
                        {
                            '2': '建华区'
                        },
                        {
                            '3': '铁锋区'
                        },
                        {
                            '4': '昂昂溪区'
                        },
                        {
                            '5': '富拉尔基区'
                        },
                        {
                            '6': '碾子山区'
                        },
                        {
                            '7': '梅里斯达斡尔族区'
                        },
                        {
                            '8': '龙江县'
                        },
                        {
                            '9': '依安县'
                        },
                        {
                            '10': '泰来县'
                        },
                        {
                            '11': '甘南县'
                        },
                        {
                            '12': '富裕县'
                        },
                        {
                            '13': '克山县'
                        },
                        {
                            '14': '克东县'
                        },
                        {
                            '15': '拜泉县'
                        },
                        {
                            '16': '讷河市'
                        },{
                            '17': '其它'
                        }]
        }, {
            'id': 3,
            'name': '鸡西',
            'regions': [{
                            '1': '鸡冠区'
                        },
                        {
                            '2': '恒山区'
                        },
                        {
                            '3': '滴道区'
                        },
                        {
                            '4': '梨树区'
                        },
                        {
                            '5': '城子河区'
                        },
                        {
                            '6': '麻山区'
                        },
                        {
                            '7': '鸡东县'
                        },
                        {
                            '8': '虎林市'
                        },
                        {
                            '9': '密山市'
                        },{
                            '10': '其它'
                        }]
        }, {
            'id': 4,
            'name': '鹤岗',
            'regions': [{
                            '1': '向阳区'
                        },
                        {
                            '2': '工农区'
                        },
                        {
                            '3': '南山区'
                        },
                        {
                            '4': '兴安区'
                        },
                        {
                            '5': '东山区'
                        },
                        {
                            '6': '兴山区'
                        },
                        {
                            '7': '萝北县'
                        },
                        {
                            '8': '绥滨县'
                        },{
                            '11': '其它'
                        }]
        }, {
            'id': 5,
            'name': '双鸭山',
            'regions': [{
                            '1': '尖山区'
                        },
                        {
                            '2': '岭东区'
                        },
                        {
                            '3': '四方台区'
                        },
                        {
                            '4': '宝山区'
                        },
                        {
                            '5': '集贤县'
                        },
                        {
                            '6': '友谊县'
                        },
                        {
                            '7': '宝清县'
                        },
                        {
                            '8': '饶河县'
                        },{
                            '9': '其它'
                        }]
        }, {
            'id': 6,
            'name': '大庆',
            'regions': [{
                            '1': '萨尔图区'
                        },
                        {
                            '2': '龙凤区'
                        },
                        {
                            '3': '让胡路区'
                        },
                        {
                            '4': '红岗区'
                        },
                        {
                            '5': '大同区'
                        },
                        {
                            '6': '肇州县'
                        },
                        {
                            '7': '肇源县'
                        },
                        {
                            '8': '林甸县'
                        },
                        {
                            '9': '杜尔伯特蒙古族自治县'
                        },
                        {
                            '10': '经济技术开发区'
                        },{
                            '11': '其它'
                        }]
        }, {
            'id': 7,
            'name': '伊春',
            'regions': [{
                            '1': '伊春区'
                        },
                        {
                            '2': '南岔区'
                        },
                        {
                            '3': '友好区'
                        },
                        {
                            '4': '西林区'
                        },
                        {
                            '5': '翠峦区'
                        },
                        {
                            '6': '新青区'
                        },
                        {
                            '7': '美溪区'
                        },
                        {
                            '8': '金山屯区'
                        },
                        {
                            '9': '五营区'
                        },
                        {
                            '10': '乌马河区'
                        },
                        {
                            '11': '汤旺河区'
                        },
                        {
                            '12': '带岭区'
                        },
                        {
                            '13': '乌伊岭区'
                        },
                        {
                            '14': '红星区'
                        },
                        {
                            '15': '上甘岭区'
                        },
                        {
                            '16': '嘉荫县'
                        },
                        {
                            '17': '铁力市'
                        },{
                            '18': '其它'
                        }]
        }, {
            'id': 8,
            'name': '佳木斯',
            'regions': [{
                            '1': '向阳区'
                        },
                        {
                            '2': '前进区'
                        },
                        {
                            '3': '东风区'
                        },
                        {
                            '4': '郊区'
                        },
                        {
                            '5': '桦南县'
                        },
                        {
                            '6': '桦川县'
                        },
                        {
                            '7': '汤原县'
                        },
                        {
                            '8': '抚远县'
                        },
                        {
                            '9': '同江市'
                        },
                        {
                            '10': '富锦市'
                        },{
                            '11': '其它'
                        }]
        }, {
            'id': 9,
            'name': '七台河',
            'regions': [{
                            '1': '新兴区'
                        },
                        {
                            '2': '桃山区'
                        },
                        {
                            '3': '茄子河区'
                        },
                        {
                            '4': '勃利县'
                        },{
                            '5': '其它'
                        }]
        }, {
            'id': 10,
            'name': '牡丹江',
            'regions': [{
                            '1': '东安区'
                        },
                        {
                            '2': '阳明区'
                        },
                        {
                            '3': '爱民区'
                        },
                        {
                            '4': '西安区'
                        },
                        {
                            '5': '东宁县'
                        },
                        {
                            '6': '林口县'
                        },
                        {
                            '7': '绥芬河市'
                        },
                        {
                            '8': '海林市'
                        },
                        {
                            '9': '宁安市'
                        },
                        {
                            '10': '穆棱市'
                        },{
                            '11': '其它'
                        }]
        }, {
            'id': 11,
            'name': '黑河',
            'regions': [{
                            '1': '爱辉区'
                        },
                        {
                            '2': '嫩江县'
                        },
                        {
                            '3': '逊克县'
                        },
                        {
                            '4': '孙吴县'
                        },
                        {
                            '5': '北安市'
                        },
                        {
                            '6': '五大连池市'
                        },{
                            '7': '其它'
                        }]
        }, {
            'id': 12,
            'name': '绥化',
            'regions': [{
                            '1': '北林区'
                        },
                        {
                            '2': '望奎县'
                        },
                        {
                            '3': '兰西县'
                        },
                        {
                            '4': '青冈县'
                        },
                        {
                            '5': '庆安县'
                        },
                        {
                            '6': '明水县'
                        },
                        {
                            '7': '绥棱县'
                        },
                        {
                            '8': '安达市'
                        },
                        {
                            '9': '肇东市'
                        },
                        {
                            '10': '海伦市'
                        },{
                            '11': '其它'
                        }]
        }, {
            'id': 27,
            'name': '大兴安岭',
            'regions': [{
                            '1': '加格达奇区'
                        },
                        {
                            '2': '松岭区'
                        },
                        {
                            '3': '新林区'
                        },
                        {
                            '4': '呼中区'
                        },
                        {
                            '5': '呼玛县'
                        },
                        {
                            '6': '塔河县'
                        },
                        {
                            '7': '漠河县'
                        },{
                            '8': '其它'
                        }]
        }]
    }, {
        'id': 31,
        'name': '上海',
        'citys': [{
            'id': 1,
            'name': '黄浦区',
            'regions': []
        }, {
            'id': 3,
            'name': '卢湾区',
            'regions': []
        }, {
            'id': 4,
            'name': '徐汇区',
            'regions': []
        }, {
            'id': 5,
            'name': '长宁区',
            'regions': []
        }, {
            'id': 6,
            'name': '静安区',
            'regions': []
        }, {
            'id': 7,
            'name': '普陀区',
            'regions': []
        }, {
            'id': 8,
            'name': '闸北区',
            'regions': []
        }, {
            'id': 9,
            'name': '虹口区',
            'regions': []
        }, {
            'id': 10,
            'name': '杨浦区',
            'regions': []
        }, {
            'id': 12,
            'name': '闵行区',
            'regions': []
        }, {
            'id': 13,
            'name': '宝山区',
            'regions': []
        }, {
            'id': 14,
            'name': '嘉定区',
            'regions': []
        }, {
            'id': 15,
            'name': '浦东新区',
            'regions': []
        }, {
            'id': 16,
            'name': '金山区',
            'regions': []
        }, {
            'id': 17,
            'name': '松江区',
            'regions': []
        }, {
            'id': 18,
            'name': '青浦区',
            'regions': []
        }, {
            'id': 19,
            'name': '南汇区',
            'regions': []
        }, {
            'id': 20,
            'name': '奉贤区',
            'regions': []
        }, {
            'id': 30,
            'name': '崇明县',
            'regions': []
        },{
            'id': 31,
            'name': '其他区',
            'regions':[]
        }]
    }, {
        'id': 32,
        'name': '江苏',
        'citys': [{
            'id': 1,
            'name': '南京',
            'regions': [{
                            '1': '玄武区'
                        },
                        {
                            '2': '白下区'
                        },
                        {
                            '3': '秦淮区'
                        },
                        {
                            '4': '建邺区'
                        },
                        {
                            '5': '鼓楼区'
                        },
                        {
                            '6': '下关区'
                        },
                        {
                            '7': '浦口区'
                        },
                        {
                            '8': '栖霞区'
                        },
                        {
                            '9': '雨花台区'
                        },
                        {
                            '10': '江宁区'
                        },
                        {
                            '11': '六合区'
                        },
                        {
                            '12': '溧水县'
                        },
                        {
                            '13': '高淳县'
                        },
                        {
                            '14': '其它'
                        }]
        }, {
            'id': 2,
            'name': '无锡',
            'regions': [{
                            '1': '崇安区'
                        },
                        {
                            '2': '南长区'
                        },
                        {
                            '3': '北塘区'
                        },
                        {
                            '4': '锡山区'
                        },
                        {
                            '5': '惠山区'
                        },
                        {
                            '6': '滨湖区'
                        },
                        {
                            '7': '江阴市'
                        },
                        {
                            '8': '宜兴市'
                        },
                        {
                            '9': '新区'
                        },
                        {
                            '10': '其它'
                        }]
        }, {
            'id': 3,
            'name': '徐州',
            'regions': [{
                            '1': '鼓楼区'
                        },
                        {
                            '2': '云龙区'
                        },
                        {
                            '3': '九里区'
                        },
                        {
                            '4': '贾汪区'
                        },
                        {
                            '5': '泉山区'
                        },
                        {
                            '6': '丰县'
                        },
                        {
                            '7': '沛县'
                        },
                        {
                            '8': '铜山县'
                        },
                        {
                            '9': '睢宁县'
                        },
                        {
                            '10': '新沂市'
                        },
                        {
                            '11': '邳州市'
                        },
                        {
                            '12': '铜山新区'
                        },
                        {
                            '13': '金山桥开发区'
                        },
                        {
                            '14': '其它'
                        }]
        }, {
            'id': 4,
            'name': '常州',
            'regions': [{
                            '1': '天宁区'
                        },
                        {
                            '2': '钟楼区'
                        },
                        {
                            '3': '戚墅堰区'
                        },
                        {
                            '4': '新北区'
                        },
                        {
                            '5': '武进区'
                        },
                        {
                            '6': '溧阳市'
                        },
                        {
                            '7': '金坛市'
                        },
                        {
                            '8': '其它'
                        }]
        }, {
            'id': 5,
            'name': '苏州',
            'regions': [{
                            '1': '沧浪区'
                        },
                        {
                            '2': '平江区'
                        },
                        {
                            '3': '金阊区'
                        },
                        {
                            '4': '虎丘区'
                        },
                        {
                            '5': '吴中区'
                        },
                        {
                            '6': '相城区'
                        },
                        {
                            '7': '常熟市'
                        },
                        {
                            '8': '张家港市'
                        },
                        {
                            '9': '昆山市'
                        },
                        {
                            '10': '吴江市'
                        },
                        {
                            '11': '太仓市'
                        },
                        {
                            '12': '新区'
                        },
                        {
                            '13': '园区'
                        },
                        {
                            '14': '工业园区'
                        },
                        {
                            '15': '其它'
                        }]
        }, {
            'id': 6,
            'name': '南通',
            'regions': [{
                            '1': '崇川区'
                        },
                        {
                            '2': '港闸区'
                        },
                        {
                            '3': '海安县'
                        },
                        {
                            '4': '如东县'
                        },
                        {
                            '5': '启东市'
                        },
                        {
                            '6': '如皋市'
                        },
                        {
                            '7': '通州市'
                        },
                        {
                            '8': '海门市'
                        },
                        {
                            '9': '南通开发区'
                        },
                        {
                            '10': '经济技术开发区'
                        },
                        {
                            '11': '市区'
                        },
                        {
                            '12': '开发区'
                        },
                        {
                            '13': '其它'
                        }]
        }, {
            'id': 7,
            'name': '连云港',
            'regions': [{
                            '1': '连云区'
                        },
                        {
                            '2': '新浦区'
                        },
                        {
                            '3': '海州区'
                        },
                        {
                            '4': '赣榆县'
                        },
                        {
                            '5': '东海县'
                        },
                        {
                            '6': '灌云县'
                        },
                        {
                            '7': '灌南县'
                        },
                        {
                            '8': '经济技术开发区'
                        },
                        {
                            '9': '其它'
                        }]
        }, {
            'id': 8,
            'name': '淮安',
            'regions': [{
                            '1': '清河区'
                        },
                        {
                            '2': '楚州区'
                        },
                        {
                            '3': '淮阴区'
                        },
                        {
                            '4': '清浦区'
                        },
                        {
                            '5': '涟水县'
                        },
                        {
                            '6': '洪泽县'
                        },
                        {
                            '7': '盱眙县'
                        },
                        {
                            '8': '金湖县'
                        },
                        {
                            '9': '淮安市开发区'
                        },
                        {
                            '10': '其它'
                        }]
        }, {
            'id': 9,
            'name': '盐城',
            'regions': [{
                            '1': '亭湖区'
                        },
                        {
                            '2': '盐都区'
                        },
                        {
                            '3': '响水县'
                        },
                        {
                            '4': '滨海县'
                        },
                        {
                            '5': '阜宁县'
                        },
                        {
                            '6': '射阳县'
                        },
                        {
                            '7': '建湖县'
                        },
                        {
                            '8': '东台市'
                        },
                        {
                            '9': '大丰市'
                        },
                        {
                            '10': '其它'
                        }]
        }, {
            'id': 10,
            'name': '扬州',
            'regions': [{
                            '1': '广陵区'
                        },
                        {
                            '2': '邗江区'
                        },
                        {
                            '3': '维扬区'
                        },
                        {
                            '4': '宝应县'
                        },
                        {
                            '5': '仪征市'
                        },
                        {
                            '6': '高邮市'
                        },
                        {
                            '7': '江都市'
                        },
                        {
                            '8': '开发区'
                        },
                        {
                            '9': '其它'
                        }]
        }, {
            'id': 11,
            'name': '镇江',
            'regions': [{
                            '1': '京口区'
                        },
                        {
                            '2': '润州区'
                        },
                        {
                            '3': '丹徒区'
                        },
                        {
                            '4': '丹阳市'
                        },
                        {
                            '5': '扬中市'
                        },
                        {
                            '6': '句容市'
                        },
                        {
                            '7': '其它'
                        }]
        }, {
            'id': 12,
            'name': '泰州',
            'regions': [{
                            '1': '海陵区'
                        },
                        {
                            '2': '高港区'
                        },
                        {
                            '3': '兴化市'
                        },
                        {
                            '4': '靖江市'
                        },
                        {
                            '5': '泰兴市'
                        },
                        {
                            '6': '姜堰市'
                        },
                        {
                            '7': '其它'
                        }]
        }, {
            'id': 13,
            'name': '宿迁',
            'regions': [{
                            '1': '宿城区'
                        },
                        {
                            '2': '宿豫区'
                        },
                        {
                            '3': '沭阳县'
                        },
                        {
                            '4': '泗阳县'
                        },
                        {
                            '5': '泗洪县'
                        },
                        {
                            '6': '其它'
                        }]
        }]
    }, {
        'id': 33,
        'name': '浙江',
        'citys': [{
            'id': 1,
            'name': '杭州',
            'regions': [{
                            '1': '上城区'
                        },
                        {
                            '2': '下城区'
                        },
                        {
                            '3': '江干区'
                        },
                        {
                            '4': '拱墅区'
                        },
                        {
                            '5': '西湖区'
                        },
                        {
                            '6': '滨江区'
                        },
                        {
                            '7': '萧山区'
                        },
                        {
                            '8': '余杭区'
                        },
                        {
                            '9': '桐庐县'
                        },
                        {
                            '10': '淳安县'
                        },
                        {
                            '11': '建德市'
                        },
                        {
                            '12': '富阳市'
                        },
                        {
                            '13': '临安市'
                        },
                        {
                            '14': '下沙经济开发区'
                        },{
                            '15': '其它'
                        }]
        }, {
            'id': 2,
            'name': '宁波',
            'regions': [{
                            '1': '海曙区'
                        },
                        {
                            '2': '江东区'
                        },
                        {
                            '3': '江北区'
                        },
                        {
                            '4': '北仑区'
                        },
                        {
                            '5': '镇海区'
                        },
                        {
                            '6': '鄞州区'
                        },
                        {
                            '7': '象山县'
                        },
                        {
                            '8': '宁海县'
                        },
                        {
                            '9': '余姚市'
                        },
                        {
                            '10': '慈溪市'
                        },
                        {
                            '11': '奉化市'
                        },{
                            '12': '其它'
                        }]
        }, {
            'id': 3,
            'name': '温州',
            'regions': [{
                            '1': '鹿城区'
                        },
                        {
                            '2': '龙湾区'
                        },
                        {
                            '3': '瓯海区'
                        },
                        {
                            '4': '洞头县'
                        },
                        {
                            '5': '永嘉县'
                        },
                        {
                            '6': '平阳县'
                        },
                        {
                            '7': '苍南县'
                        },
                        {
                            '8': '文成县'
                        },
                        {
                            '9': '泰顺县'
                        },
                        {
                            '10': '瑞安市'
                        },
                        {
                            '11': '乐清市'
                        },{
                            '12': '其它'
                        }]
        }, {
            'id': 4,
            'name': '嘉兴',
            'regions': [{
                            '1': '南湖区'
                        },
                        {
                            '2': '秀洲区'
                        },
                        {
                            '3': '嘉善县'
                        },
                        {
                            '4': '海盐县'
                        },
                        {
                            '5': '海宁市'
                        },
                        {
                            '6': '平湖市'
                        },
                        {
                            '7': '桐乡市'
                        },{
                            '8': '其它'
                        }]
        }, {
            'id': 5,
            'name': '湖州',
            'regions': [{
                            '1': '吴兴区'
                        },
                        {
                            '2': '南浔区'
                        },
                        {
                            '3': '德清县'
                        },
                        {
                            '4': '长兴县'
                        },
                        {
                            '5': '安吉县'
                        },{
                            '6': '其它'
                        }]
        }, {
            'id': 6,
            'name': '绍兴',
            'regions': [{
                            '1': '越城区'
                        },
                        {
                            '2': '绍兴县'
                        },
                        {
                            '3': '新昌县'
                        },
                        {
                            '4': '诸暨市'
                        },
                        {
                            '5': '上虞市'
                        },
                        {
                            '6': '嵊州市'
                        },{
                            '7': '其它'
                        }]
        }, {
            'id': 7,
            'name': '金华',
            'regions': [{
                            '1': '婺城区'
                        },
                        {
                            '2': '金东区'
                        },
                        {
                            '3': '武义县'
                        },
                        {
                            '4': '浦江县'
                        },
                        {
                            '5': '磐安县'
                        },
                        {
                            '6': '兰溪市'
                        },
                        {
                            '7': '义乌市'
                        },
                        {
                            '8': '东阳市'
                        },
                        {
                            '9': '永康市'
                        },{
                            '10': '其它'
                        }]
        }, {
            'id': 8,
            'name': '衢州',
            'regions': [{
                            '1': '柯城区'
                        },
                        {
                            '2': '衢江区'
                        },
                        {
                            '3': '常山县'
                        },
                        {
                            '4': '开化县'
                        },
                        {
                            '5': '龙游县'
                        },
                        {
                            '6': '江山市'
                        },{
                            '7': '其它'
                        }]
        }, {
            'id': 9,
            'name': '舟山',
            'regions': [{
                            '1': '定海区'
                        },
                        {
                            '2': '普陀区'
                        },
                        {
                            '3': '岱山县'
                        },
                        {
                            '4': '嵊泗县'
                        },{
                            '5': '其它'
                        }]
        }, {
            'id': 10,
            'name': '台州',
            'regions': [{
                            '1': '椒江区'
                        },
                        {
                            '2': '黄岩区'
                        },
                        {
                            '3': '路桥区'
                        },
                        {
                            '4': '玉环县'
                        },
                        {
                            '5': '三门县'
                        },
                        {
                            '6': '天台县'
                        },
                        {
                            '7': '仙居县'
                        },
                        {
                            '8': '温岭市'
                        },
                        {
                            '9': '临海市'
                        },{
                            '10': '其它'
                        }]
        }, {
            'id': 11,
            'name': '丽水',
            'regions': [{
                            '1': '莲都区'
                        },
                        {
                            '2': '青田县'
                        },
                        {
                            '3': '缙云县'
                        },
                        {
                            '4': '遂昌县'
                        },
                        {
                            '5': '松阳县'
                        },
                        {
                            '6': '云和县'
                        },
                        {
                            '7': '庆元县'
                        },
                        {
                            '8': '景宁畲族自治县'
                        },
                        {
                            '9': '龙泉市'
                        },{
                            '10': '其它'
                        }]
        }]
    }, {
        'id': 34,
        'name': '安徽',
        'citys': [{
            'id': 1,
            'name': '合肥',
            'regions': [{
                            '1': '瑶海区'
                        },
                        {
                            '2': '庐阳区'
                        },
                        {
                            '3': '蜀山区'
                        },
                        {
                            '4': '包河区'
                        },
                        {
                            '5': '长丰县'
                        },
                        {
                            '6': '肥东县'
                        },
                        {
                            '7': '肥西县'
                        },
                        {
                            '8': '高新技术开发区'
                        },
                        {
                            '9': '高新区'
                        },
                        {
                            '10': '循环经济开发区'
                        },
                        {
                            '11': '经济技术开发区'
                        },
                        {
                            '12': '其它'
                        }]
        }, {
            'id': 2,
            'name': '芜湖',
            'regions': [{
                            '1': '镜湖区'
                        },
                        {
                            '2': '弋江区'
                        },
                        {
                            '3': '鸠江区'
                        },
                        {
                            '4': '三山区'
                        },
                        {
                            '5': '芜湖县'
                        },
                        {
                            '6': '繁昌县'
                        },
                        {
                            '7': '南陵县'
                        },
                        {
                            '8': '经济技术开发区'
                        },
                        {
                            '9': '高新技术开发区'
                        },{
                            '10': '其它'
                        }]
        }, {
            'id': 3,
            'name': '蚌埠',
            'regions': [{
                            '1': '龙子湖区'
                        },
                        {
                            '2': '蚌山区'
                        },
                        {
                            '3': '禹会区'
                        },
                        {
                            '4': '淮上区'
                        },
                        {
                            '5': '怀远县'
                        },
                        {
                            '6': '五河县'
                        },
                        {
                            '7': '固镇县'
                        },
                        {
                            '8': '高新技术产业开发区'
                        },
                        {
                            '9': '蚌埠新城开发区'
                        },{
                            '10': '其它'
                        }]
        }, {
            'id': 4,
            'name': '淮南',
            'regions': [{
                            '1': '大通区'
                        },
                        {
                            '2': '田家庵区'
                        },
                        {
                            '3': '谢家集区'
                        },
                        {
                            '4': '八公山区'
                        },
                        {
                            '5': '潘集区'
                        },
                        {
                            '6': '凤台县'
                        },{
                            '7': '其它'
                        }]
        }, {
            'id': 5,
            'name': '马鞍山',
            'regions': [{
                            '1': '金家庄区'
                        },
                        {
                            '2': '花山区'
                        },
                        {
                            '3': '雨山区'
                        },
                        {
                            '4': '当涂县'
                        },
                        {
                            '5': '马鞍山经济开发区'
                        },{
                            '6': '其它'
                        }]
        }, {
            'id': 6,
            'name': '淮北',
            'regions': [{
                            '1': '杜集区'
                        },
                        {
                            '2': '相山区'
                        },
                        {
                            '3': '烈山区'
                        },
                        {
                            '4': '濉溪县'
                        },{
                            '5': '其它'
                        }]
        }, {
            'id': 7,
            'name': '铜陵',
            'regions': [{
                            '1': '铜官山区'
                        },
                        {
                            '2': '狮子山区'
                        },
                        {
                            '3': '郊区'
                        },
                        {
                            '4': '铜陵县'
                        },{
                            '5': '其它'
                        }]
        }, {
            'id': 8,
            'name': '安庆',
            'regions': [{
                            '1': '迎江区'
                        },
                        {
                            '2': '大观区'
                        },
                        {
                            '3': '宜秀区'
                        },
                        {
                            '4': '怀宁县'
                        },
                        {
                            '5': '枞阳县'
                        },
                        {
                            '6': '潜山县'
                        },
                        {
                            '7': '太湖县'
                        },
                        {
                            '8': '宿松县'
                        },
                        {
                            '9': '望江县'
                        },
                        {
                            '10': '岳西县'
                        },
                        {
                            '11': '桐城市'
                        },
                        {
                            '12': '安庆长江大桥综合经济开发区'
                        },
                        {
                            '13': '经济技术开发区'
                        },{
                            '14': '其它'
                        }]
        }, {
            'id': 10,
            'name': '黄山',
            'regions': [{
                            '1': '屯溪区'
                        },
                        {
                            '2': '黄山区'
                        },
                        {
                            '3': '徽州区'
                        },
                        {
                            '4': '歙县'
                        },
                        {
                            '5': '休宁县'
                        },
                        {
                            '6': '黟县'
                        },
                        {
                            '7': '祁门县'
                        },
                        {
                            '8': '黄山经济开发区'
                        },{
                            '9': '其它'
                        }]
        }, {
            'id': 11,
            'name': '滁州',
            'regions': [{
                            '1': '琅琊区'
                        },
                        {
                            '2': '南谯区'
                        },
                        {
                            '3': '来安县'
                        },
                        {
                            '4': '全椒县'
                        },
                        {
                            '5': '定远县'
                        },
                        {
                            '6': '凤阳县'
                        },
                        {
                            '7': '天长市'
                        },
                        {
                            '8': '明光市'
                        },
                        {
                            '9': '滁州市经济开发区'
                        },{
                            '10': '其它'
                        }]
        }, {
            'id': 12,
            'name': '阜阳',
            'regions': [{
                            '1': '颍州区'
                        },
                        {
                            '2': '颍东区'
                        },
                        {
                            '3': '颍泉区'
                        },
                        {
                            '4': '临泉县'
                        },
                        {
                            '5': '太和县'
                        },
                        {
                            '6': '阜南县'
                        },
                        {
                            '7': '颍上县'
                        },
                        {
                            '8': '界首市'
                        },{
                            '9': '其它'
                        }]
        }, {
            'id': 13,
            'name': '宿州',
            'regions': [{
                            '1': '埇桥区'
                        },
                        {
                            '2': '砀山县'
                        },
                        {
                            '3': '萧县'
                        },
                        {
                            '4': '灵璧县'
                        },
                        {
                            '5': '泗县'
                        },{
                            '6': '其它'
                        }]
        }, {
            'id': 14,
            'name': '巢湖',
            'regions': [{
                            '1': '居巢区'
                        },
                        {
                            '2': '庐江县'
                        },
                        {
                            '3': '无为县'
                        },
                        {
                            '4': '含山县'
                        },
                        {
                            '5': '和县'
                        },
                        {
                            '6': '巢湖经济开发区'
                        },{
                            '7': '其它'
                        }]
        }, {
            'id': 15,
            'name': '六安',
            'regions': [{
                            '1': '金安区'
                        },
                        {
                            '2': '裕安区'
                        },
                        {
                            '3': '寿县'
                        },
                        {
                            '4': '霍邱县'
                        },
                        {
                            '5': '舒城县'
                        },
                        {
                            '6': '金寨县'
                        },
                        {
                            '7': '霍山县'
                        },
                        {
                            '8': '六安经济开发区'
                        },{
                            '9': '其它'
                        }]
        }, {
            'id': 16,
            'name': '亳州',
            'regions': [{
                            '1': '谯城区'
                        },
                        {
                            '2': '涡阳县'
                        },
                        {
                            '3': '蒙城县'
                        },
                        {
                            '4': '利辛县'
                        },{
                            '5': '其它'
                        }]
        }, {
            'id': 17,
            'name': '池州',
            'regions': [{
                            '1': '贵池区'
                        },
                        {
                            '2': '东至县'
                        },
                        {
                            '3': '石台县'
                        },
                        {
                            '4': '青阳县'
                        },{
                            '5': '其它'
                        }]
        }, {
            'id': 18,
            'name': '宣城',
            'regions': [{
                            '1': '宣州区'
                        },
                        {
                            '2': '郎溪县'
                        },
                        {
                            '3': '广德县'
                        },
                        {
                            '4': '泾县'
                        },
                        {
                            '5': '绩溪县'
                        },
                        {
                            '6': '旌德县'
                        },
                        {
                            '7': '宁国市'
                        },
                        {
                            '8': '宣州经济开发区'
                        },{
                            '9': '其它'
                        }]
        }]
    }, {
        'id': 35,
        'name': '福建',
        'citys': [{
            'id': 1,
            'name': '福州',
            'regions': [{
                            '1': '鼓楼区'
                        },
                        {
                            '2': '台江区'
                        },
                        {
                            '3': '仓山区'
                        },
                        {
                            '4': '马尾区'
                        },
                        {
                            '5': '晋安区'
                        },
                        {
                            '6': '闽侯县'
                        },
                        {
                            '7': '连江县'
                        },
                        {
                            '8': '罗源县'
                        },
                        {
                            '9': '闽清县'
                        },
                        {
                            '10': '永泰县'
                        },
                        {
                            '11': '平潭县'
                        },
                        {
                            '12': '福清市'
                        },
                        {
                            '13': '长乐市'
                        },
                        {
                            '14': '其它'
                        }]
        }, {
            'id': 2,
            'name': '厦门',
            'regions': [{
                            '1': '思明区'
                        },
                        {
                            '2': '海沧区'
                        },
                        {
                            '3': '湖里区'
                        },
                        {
                            '4': '集美区'
                        },
                        {
                            '5': '同安区'
                        },
                        {
                            '6': '翔安区'
                        },
                        {
                            '7': '其它'
                        }]
        }, {
            'id': 3,
            'name': '莆田',
            'regions': [{
                            '1': '城厢区'
                        },
                        {
                            '2': '涵江区'
                        },
                        {
                            '3': '荔城区'
                        },
                        {
                            '4': '秀屿区'
                        },
                        {
                            '5': '仙游县'
                        },
                        {
                            '6': '其他区'
                        }]
        }, {
            'id': 4,
            'name': '三明',
            'regions': [{
                            '1': '梅列区'
                        },
                        {
                            '2': '三元区'
                        },
                        {
                            '3': '明溪县'
                        },
                        {
                            '4': '清流县'
                        },
                        {
                            '5': '宁化县'
                        },
                        {
                            '6': '大田县'
                        },
                        {
                            '7': '尤溪县'
                        },
                        {
                            '8': '沙县'
                        },
                        {
                            '9': '将乐县'
                        },
                        {
                            '10': '泰宁县'
                        },
                        {
                            '11': '建宁县'
                        },
                        {
                            '12': '永安市'
                        },
                        {
                            '13': '其它'
                        }]
        }, {
            'id': 5,
            'name': '泉州',
            'regions': [{
                            '1': '鲤城区'
                        },
                        {
                            '2': '丰泽区'
                        },
                        {
                            '3': '洛江区'
                        },
                        {
                            '4': '泉港区'
                        },
                        {
                            '5': '惠安县'
                        },
                        {
                            '6': '安溪县'
                        },
                        {
                            '7': '永春县'
                        },
                        {
                            '8': '德化县'
                        },
                        {
                            '9': '金门县'
                        },
                        {
                            '10': '石狮市'
                        },
                        {
                            '11': '晋江市'
                        },
                        {
                            '12': '南安市'
                        },
                        {
                            '13': '其它'
                        }]
        }, {
            'id': 6,
            'name': '漳州',
            'regions': [{
                            '1': '芗城区'
                        },
                        {
                            '2': '龙文区'
                        },
                        {
                            '3': '云霄县'
                        },
                        {
                            '4': '漳浦县'
                        },
                        {
                            '5': '诏安县'
                        },
                        {
                            '6': '长泰县'
                        },
                        {
                            '7': '东山县'
                        },
                        {
                            '8': '南靖县'
                        },
                        {
                            '9': '平和县'
                        },
                        {
                            '10': '华安县'
                        },
                        {
                            '11': '龙海市'
                        },
                        {
                            '12': '其它'
                        }]
        }, {
            'id': 7,
            'name': '南平',
            'regions': [{
                            '1': '延平区'
                        },
                        {
                            '2': '顺昌县'
                        },
                        {
                            '3': '浦城县'
                        },
                        {
                            '4': '光泽县'
                        },
                        {
                            '5': '松溪县'
                        },
                        {
                            '6': '政和县'
                        },
                        {
                            '7': '邵武市'
                        },
                        {
                            '8': '武夷山市'
                        },
                        {
                            '9': '建瓯市'
                        },
                        {
                            '10': '建阳市'
                        },
                        {
                            '11': '其它'
                        }]
        }, {
            'id': 8,
            'name': '龙岩',
            'regions': [{
                            '1': '新罗区'
                        },
                        {
                            '2': '长汀县'
                        },
                        {
                            '3': '永定县'
                        },
                        {
                            '4': '上杭县'
                        },
                        {
                            '5': '武平县'
                        },
                        {
                            '6': '连城县'
                        },
                        {
                            '7': '漳平市'
                        },
                        {
                            '8': '其它'
                        }]
        }, {
            'id': 9,
            'name': '宁德',
            'regions': [{
                            '1': '蕉城区'
                        },
                        {
                            '2': '霞浦县'
                        },
                        {
                            '3': '古田县'
                        },
                        {
                            '4': '屏南县'
                        },
                        {
                            '5': '寿宁县'
                        },
                        {
                            '6': '周宁县'
                        },
                        {
                            '7': '柘荣县'
                        },
                        {
                            '8': '福安市'
                        },
                        {
                            '9': '福鼎市'
                        },
                        {
                            '10': '其他区'
                        }]
        }]
    }, {
        'id': 36,
        'name': '江西',
        'citys': [{
            'id': 1,
            'name': '南昌',
            'regions': [{
                            '1': '东湖区'
                        },
                        {
                            '2': '西湖区'
                        },
                        {
                            '3': '青云谱区'
                        },
                        {
                            '4': '湾里区'
                        },
                        {
                            '5': '青山湖区'
                        },
                        {
                            '6': '南昌县'
                        },
                        {
                            '7': '新建县'
                        },
                        {
                            '8': '安义县'
                        },
                        {
                            '9': '进贤县'
                        },
                        {
                            '10': '高新区'
                        },
                        {
                            '11': '南昌经济技术开发区'
                        },
                        {
                            '12': '昌北区'
                        },
                        {
                            '13': '红谷滩新区'
                        },{
                            '14': '其它'
                        }]
        }, {
            'id': 2,
            'name': '景德镇',
            'regions': [{
                            '1': '昌江区'
                        },
                        {
                            '2': '珠山区'
                        },
                        {
                            '3': '浮梁县'
                        },
                        {
                            '4': '乐平市'
                        },{
                            '5': '其它'
                        }]
        }, {
            'id': 3,
            'name': '萍乡',
            'regions': [{
                            '1': '安源区'
                        },
                        {
                            '2': '湘东区'
                        },
                        {
                            '3': '莲花县'
                        },
                        {
                            '4': '上栗县'
                        },
                        {
                            '5': '芦溪县'
                        },{
                            '6': '其它'
                        }]
        }, {
            'id': 4,
            'name': '九江',
            'regions': [{
                            '1': '庐山区'
                        },
                        {
                            '2': '浔阳区'
                        },
                        {
                            '3': '九江县'
                        },
                        {
                            '4': '武宁县'
                        },
                        {
                            '5': '修水县'
                        },
                        {
                            '6': '永修县'
                        },
                        {
                            '7': '德安县'
                        },
                        {
                            '8': '星子县'
                        },
                        {
                            '9': '都昌县'
                        },
                        {
                            '10': '湖口县'
                        },
                        {
                            '11': '彭泽县'
                        },
                        {
                            '12': '瑞昌市'
                        },
                        {
                            '13': '九江经济开发区'
                        },
                        {
                            '14': '共青开放开发区'
                        },{
                            '15': '其它'
                        }]
        }, {
            'id': 5,
            'name': '新余',
            'regions': [{
                            '1': '渝水区'
                        },
                        {
                            '2': '分宜县'
                        },
                        {
                            '3': '高新经济技术开发区'
                        },{
                            '4': '其它'
                        }]
        }, {
            'id': 6,
            'name': '鹰潭',
            'regions': [{
                            '1': '月湖区'
                        },
                        {
                            '2': '余江县'
                        },
                        {
                            '3': '贵溪市'
                        },{
                            '4': '其它'
                        }]
        }, {
            'id': 7,
            'name': '赣州',
            'regions': [{
                            '1': '章贡区'
                        },
                        {
                            '2': '赣县'
                        },
                        {
                            '3': '信丰县'
                        },
                        {
                            '4': '大余县'
                        },
                        {
                            '5': '上犹县'
                        },
                        {
                            '6': '崇义县'
                        },
                        {
                            '7': '安远县'
                        },
                        {
                            '8': '龙南县'
                        },
                        {
                            '9': '定南县'
                        },
                        {
                            '10': '全南县'
                        },
                        {
                            '11': '宁都县'
                        },
                        {
                            '12': '于都县'
                        },
                        {
                            '13': '兴国县'
                        },
                        {
                            '14': '会昌县'
                        },
                        {
                            '15': '寻乌县'
                        },
                        {
                            '16': '石城县'
                        },
                        {
                            '17': '瑞金市'
                        },
                        {
                            '18': '南康市'
                        },
                        {
                            '19': '赣州经济开发区'
                        },{
                            '20': '其它'
                        }]
        }, {
            'id': 8,
            'name': '吉安',
            'regions': [{
                            '1': '吉州区'
                        },
                        {
                            '2': '青原区'
                        },
                        {
                            '3': '吉安县'
                        },
                        {
                            '4': '吉水县'
                        },
                        {
                            '5': '峡江县'
                        },
                        {
                            '6': '新干县'
                        },
                        {
                            '7': '永丰县'
                        },
                        {
                            '8': '泰和县'
                        },
                        {
                            '9': '遂川县'
                        },
                        {
                            '10': '万安县'
                        },
                        {
                            '11': '安福县'
                        },
                        {
                            '12': '永新县'
                        },
                        {
                            '13': '井冈山市'
                        },{
                            '14': '其它'
                        }]
        }, {
            'id': 9,
            'name': '宜春',
            'regions': [{
                            '1': '袁州区'
                        },
                        {
                            '2': '奉新县'
                        },
                        {
                            '3': '万载县'
                        },
                        {
                            '4': '上高县'
                        },
                        {
                            '5': '宜丰县'
                        },
                        {
                            '6': '靖安县'
                        },
                        {
                            '7': '铜鼓县'
                        },
                        {
                            '8': '丰城市'
                        },
                        {
                            '9': '樟树市'
                        },
                        {
                            '10': '高安市'
                        },{
                            '11': '其它'
                        }]
        }, {
            'id': 10,
            'name': '抚州',
            'regions': [{
                            '1': '临川区'
                        },
                        {
                            '2': '南城县'
                        },
                        {
                            '3': '黎川县'
                        },
                        {
                            '4': '南丰县'
                        },
                        {
                            '5': '崇仁县'
                        },
                        {
                            '6': '乐安县'
                        },
                        {
                            '7': '宜黄县'
                        },
                        {
                            '8': '金溪县'
                        },
                        {
                            '9': '资溪县'
                        },
                        {
                            '10': '东乡县'
                        },
                        {
                            '11': '广昌县'
                        },{
                            '12': '其它'
                        }]
        }, {
            'id': 11,
            'name': '上饶',
            'regions': [{
                            '1': '信州区'
                        },
                        {
                            '2': '上饶县'
                        },
                        {
                            '3': '广丰县'
                        },
                        {
                            '4': '玉山县'
                        },
                        {
                            '5': '铅山县'
                        },
                        {
                            '6': '横峰县'
                        },
                        {
                            '7': '弋阳县'
                        },
                        {
                            '8': '余干县'
                        },
                        {
                            '9': '鄱阳县'
                        },
                        {
                            '10': '万年县'
                        },
                        {
                            '11': '婺源县'
                        },
                        {
                            '12': '德兴市'
                        },
                        {
                            '13': '上饶经济技术开发区'
                        },{
                            '14': '其它'
                        }]
        }]
    }, {
        'id': 37,
        'name': '山东',
        'citys': [{
            'id': 1,
            'name': '济南',
            'regions': [{
                            '1': '历下区'
                        },
                        {
                            '2': '市中区'
                        },
                        {
                            '3': '槐荫区'
                        },
                        {
                            '4': '天桥区'
                        },
                        {
                            '5': '历城区'
                        },
                        {
                            '6': '长清区'
                        },
                        {
                            '7': '平阴县'
                        },
                        {
                            '8': '济阳县'
                        },
                        {
                            '9': '商河县'
                        },
                        {
                            '10': '章丘市'
                        },
                        {
                            '11': '高新技术开发区'
                        },{
                            '12': '其它'
                        }]
        }, {
            'id': 2,
            'name': '青岛',
            'regions': [{
                            '1': '市南区'
                        },
                        {
                            '2': '市北区'
                        },
                        {
                            '3': '四方区'
                        },
                        {
                            '4': '黄岛区'
                        },
                        {
                            '5': '崂山区'
                        },
                        {
                            '6': '李沧区'
                        },
                        {
                            '7': '城阳区'
                        },
                        {
                            '8': '胶州市'
                        },
                        {
                            '9': '即墨市'
                        },
                        {
                            '10': '平度市'
                        },
                        {
                            '11': '胶南市'
                        },
                        {
                            '12': '莱西市'
                        },{
                            '13': '其它'
                        }]
        }, {
            'id': 3,
            'name': '淄博',
            'regions': [{
                            '1': '淄川区'
                        },
                        {
                            '2': '张店区'
                        },
                        {
                            '3': '博山区'
                        },
                        {
                            '4': '临淄区'
                        },
                        {
                            '5': '周村区'
                        },
                        {
                            '6': '桓台县'
                        },
                        {
                            '7': '高青县'
                        },
                        {
                            '8': '沂源县'
                        },{
                            '9': '其它'
                        }]
        }, {
            'id': 4,
            'name': '枣庄',
            'regions': [{
                            '1': '市中区'
                        },
                        {
                            '2': '薛城区'
                        },
                        {
                            '3': '峄城区'
                        },
                        {
                            '4': '台儿庄区'
                        },
                        {
                            '5': '山亭区'
                        },
                        {
                            '6': '滕州市'
                        },{
                            '7': '其它'
                        }]
        }, {
            'id': 5,
            'name': '东营',
            'regions': [{
                            '1': '东营区'
                        },
                        {
                            '2': '河口区'
                        },
                        {
                            '3': '垦利县'
                        },
                        {
                            '4': '利津县'
                        },
                        {
                            '5': '广饶县'
                        },{
                            '6': '其它'
                        }]
        }, {
            'id': 6,
            'name': '烟台',
            'regions': [{
                            '1': '芝罘区'
                        },
                        {
                            '2': '福山区'
                        },
                        {
                            '3': '牟平区'
                        },
                        {
                            '4': '莱山区'
                        },
                        {
                            '5': '长岛县'
                        },
                        {
                            '6': '龙口市'
                        },
                        {
                            '7': '莱阳市'
                        },
                        {
                            '8': '莱州市'
                        },
                        {
                            '9': '蓬莱市'
                        },
                        {
                            '10': '招远市'
                        },
                        {
                            '11': '栖霞市'
                        },
                        {
                            '12': '海阳市'
                        },
                        {
                            '13': '烟台经济技术开发区'
                        },{
                            '14': '其它'
                        }]
        }, {
            'id': 7,
            'name': '潍坊',
            'regions': [{
                            '1': '潍城区'
                        },
                        {
                            '2': '寒亭区'
                        },
                        {
                            '3': '坊子区'
                        },
                        {
                            '4': '奎文区'
                        },
                        {
                            '5': '临朐县'
                        },
                        {
                            '6': '昌乐县'
                        },
                        {
                            '7': '青州市'
                        },
                        {
                            '8': '诸城市'
                        },
                        {
                            '9': '寿光市'
                        },
                        {
                            '10': '安丘市'
                        },
                        {
                            '11': '高密市'
                        },
                        {
                            '12': '昌邑市'
                        },{
                            '13': '其它'
                        }]
        }, {
            'id': 8,
            'name': '济宁',
            'regions': [{
                            '1': '市中区'
                        },
                        {
                            '2': '任城区'
                        },
                        {
                            '3': '微山县'
                        },
                        {
                            '4': '鱼台县'
                        },
                        {
                            '5': '金乡县'
                        },
                        {
                            '6': '嘉祥县'
                        },
                        {
                            '7': '汶上县'
                        },
                        {
                            '8': '泗水县'
                        },
                        {
                            '9': '梁山县'
                        },
                        {
                            '10': '曲阜市'
                        },
                        {
                            '11': '兖州市'
                        },
                        {
                            '12': '邹城市'
                        },
                        {
                            '13': '高新技术产业开发区'
                        },{
                            '14': '其它'
                        }]
        }, {
            'id': 9,
            'name': '泰安',
            'regions': [{
                            '1': '泰山区'
                        },
                        {
                            '2': '岱岳区'
                        },
                        {
                            '3': '宁阳县'
                        },
                        {
                            '4': '东平县'
                        },
                        {
                            '5': '新泰市'
                        },
                        {
                            '6': '肥城市'
                        },{
                            '7': '其它'
                        }]
        }, {
            'id': 10,
            'name': '威海',
            'regions': [{
                            '1': '环翠区'
                        },
                        {
                            '2': '文登市'
                        },
                        {
                            '3': '荣成市'
                        },
                        {
                            '4': '乳山市'
                        },
                        {
                            '5': '其它'
                        },
                        {
                            '6': '高区'
                        },
                        {
                            '7': '经区'
                        }]
        }, {
            'id': 11,
            'name': '日照',
            'regions': [{
                            '1': '东港区'
                        },
                        {
                            '2': '岚山区'
                        },
                        {
                            '3': '五莲县'
                        },
                        {
                            '4': '莒县'
                        },
                        {
                            '5': '日照经济技术开发区'
                        },{
                            '6': '其它'
                        }]
        }, {
            'id': 12,
            'name': '莱芜',
            'regions': [{
                            '1': '莱城区'
                        },
                        {
                            '2': '钢城区'
                        },{
                            '3': '其它'
                        }]
        }, {
            'id': 13,
            'name': '临沂',
            'regions': [{
                            '1': '兰山区'
                        },
                        {
                            '2': '罗庄区'
                        },
                        {
                            '3': '河东区'
                        },
                        {
                            '4': '沂南县'
                        },
                        {
                            '5': '郯城县'
                        },
                        {
                            '6': '沂水县'
                        },
                        {
                            '7': '苍山县'
                        },
                        {
                            '8': '费县'
                        },
                        {
                            '9': '平邑县'
                        },
                        {
                            '10': '莒南县'
                        },
                        {
                            '11': '蒙阴县'
                        },
                        {
                            '12': '临沭县'
                        },{
                            '13': '其它'
                        }]
        }, {
            'id': 14,
            'name': '德州',
            'regions': [{
                            '1': '德城区'
                        },
                        {
                            '2': '陵县'
                        },
                        {
                            '3': '宁津县'
                        },
                        {
                            '4': '庆云县'
                        },
                        {
                            '5': '临邑县'
                        },
                        {
                            '6': '齐河县'
                        },
                        {
                            '7': '平原县'
                        },
                        {
                            '8': '夏津县'
                        },
                        {
                            '9': '武城县'
                        },
                        {
                            '10': '乐陵市'
                        },
                        {
                            '11': '禹城市'
                        },
                        {
                            '12': '商贸开发区'
                        },
                        {
                            '13': '经济开发区'
                        },{
                            '14': '其它'
                        }]
        }, {
            'id': 15,
            'name': '聊城',
            'regions': [{
                            '1': '东昌府区'
                        },
                        {
                            '2': '阳谷县'
                        },
                        {
                            '3': '莘县'
                        },
                        {
                            '4': '茌平县'
                        },
                        {
                            '5': '东阿县'
                        },
                        {
                            '6': '冠县'
                        },
                        {
                            '7': '高唐县'
                        },
                        {
                            '8': '临清市'
                        },
                        {
                            '9': '经济技术开发区'
                        },{
                            '10': '其它'
                        }]
        }, {
            'id': 16,
            'name': '滨州',
            'regions': [{
                            '1': '滨城区'
                        },
                        {
                            '2': '惠民县'
                        },
                        {
                            '3': '阳信县'
                        },
                        {
                            '4': '无棣县'
                        },
                        {
                            '5': '沾化县'
                        },
                        {
                            '6': '博兴县'
                        },
                        {
                            '7': '邹平县'
                        },{
                            '8': '其它'
                        }]
        }, {
            'id': 17,
            'name': '菏泽',
            'regions': [{
                            '1': '牡丹区'
                        },
                        {
                            '2': '曹县'
                        },
                        {
                            '3': '单县'
                        },
                        {
                            '4': '成武县'
                        },
                        {
                            '5': '巨野县'
                        },
                        {
                            '6': '郓城县'
                        },
                        {
                            '7': '鄄城县'
                        },
                        {
                            '8': '定陶县'
                        },
                        {
                            '9': '东明县'
                        },{
                            '10': '其它'
                        }]
        }]
    }, {
        'id': 41,
        'name': '河南',
        'citys': [{
            'id': 1,
            'name': '郑州',
            'regions': [{
                            '1': '中原区'
                        },
                        {
                            '2': '二七区'
                        },
                        {
                            '3': '管城回族区'
                        },
                        {
                            '4': '金水区'
                        },
                        {
                            '5': '上街区'
                        },
                        {
                            '6': '惠济区'
                        },
                        {
                            '7': '中牟县'
                        },
                        {
                            '8': '巩义市'
                        },
                        {
                            '9': '荥阳市'
                        },
                        {
                            '10': '新密市'
                        },
                        {
                            '11': '新郑市'
                        },
                        {
                            '12': '登封市'
                        },
                        {
                            '13': '高新技术产业开发区'
                        },
                        {
                            '14': '其它'
                        },
                        {
                            '15': '郑东新区'
                        }]
        }, {
            'id': 2,
            'name': '开封',
            'regions': [{
                            '1': '龙亭区'
                        },
                        {
                            '2': '顺河回族区'
                        },
                        {
                            '3': '鼓楼区'
                        },
                        {
                            '4': '禹王台区'
                        },
                        {
                            '5': '金明区'
                        },
                        {
                            '6': '杞县'
                        },
                        {
                            '7': '通许县'
                        },
                        {
                            '8': '尉氏县'
                        },
                        {
                            '9': '开封县'
                        },
                        {
                            '10': '兰考县'
                        },
                        {
                            '11': '其它'
                        }]
        }, {
            'id': 3,
            'name': '洛阳',
            'regions': [{
                            '1': '老城区'
                        },
                        {
                            '2': '西工区'
                        },
                        {
                            '3': '廛河回族区'
                        },
                        {
                            '4': '涧西区'
                        },
                        {
                            '5': '吉利区'
                        },
                        {
                            '6': '洛龙区'
                        },
                        {
                            '7': '孟津县'
                        },
                        {
                            '8': '新安县'
                        },
                        {
                            '9': '栾川县'
                        },
                        {
                            '10': '嵩县'
                        },
                        {
                            '11': '汝阳县'
                        },
                        {
                            '12': '宜阳县'
                        },
                        {
                            '13': '洛宁县'
                        },
                        {
                            '14': '伊川县'
                        },
                        {
                            '15': '偃师市'
                        },
                        {
                            '16': '其他区'
                        },
                        {
                            '17': '经济技术开发区'
                        },
                        {
                            '18': '高新技术开发区'
                        }]
        }, {
            'id': 4,
            'name': '平顶山',
            'regions': [{
                            '1': '新华区'
                        },
                        {
                            '2': '卫东区'
                        },
                        {
                            '3': '石龙区'
                        },
                        {
                            '4': '湛河区'
                        },
                        {
                            '5': '宝丰县'
                        },
                        {
                            '6': '叶县'
                        },
                        {
                            '7': '鲁山县'
                        },
                        {
                            '8': '郏县'
                        },
                        {
                            '9': '舞钢市'
                        },
                        {
                            '10': '汝州市'
                        },
                        {
                            '11': '高新技术开发区'
                        },
                        {
                            '12': '其他区'
                        }]
        }, {
            'id': 5,
            'name': '安阳',
            'regions': [{
                            '1': '文峰区'
                        },
                        {
                            '2': '北关区'
                        },
                        {
                            '3': '殷都区'
                        },
                        {
                            '4': '龙安区'
                        },
                        {
                            '5': '安阳县'
                        },
                        {
                            '6': '汤阴县'
                        },
                        {
                            '7': '滑县'
                        },
                        {
                            '8': '内黄县'
                        },
                        {
                            '9': '林州市'
                        },
                        {
                            '10': '其他区'
                        },
                        {
                            '11': '安阳高新技术开发区'
                        }]
        }, {
            'id': 6,
            'name': '鹤壁',
            'regions': [{
                            '1': '鹤山区'
                        },
                        {
                            '2': '山城区'
                        },
                        {
                            '3': '淇滨区'
                        },
                        {
                            '4': '浚县'
                        },
                        {
                            '5': '淇县'
                        },
                        {
                            '6': '金山工业区'
                        },
                        {
                            '7': '其他区'
                        }]
        }, {
            'id': 7,
            'name': '新乡',
            'regions': [{
                            '1': '红旗区'
                        },
                        {
                            '2': '卫滨区'
                        },
                        {
                            '3': '凤泉区'
                        },
                        {
                            '4': '牧野区'
                        },
                        {
                            '5': '新乡县'
                        },
                        {
                            '6': '获嘉县'
                        },
                        {
                            '7': '原阳县'
                        },
                        {
                            '8': '延津县'
                        },
                        {
                            '9': '封丘县'
                        },
                        {
                            '10': '长垣县'
                        },
                        {
                            '11': '卫辉市'
                        },
                        {
                            '12': '辉县市'
                        },
                        {
                            '13': '其他区'
                        },
                        {
                            '14': '高新技术开发区'
                        },
                        {
                            '15': '小店工业区'
                        }]
        }, {
            'id': 8,
            'name': '焦作',
            'regions': [{
                            '1': '解放区'
                        },
                        {
                            '2': '中站区'
                        },
                        {
                            '3': '马村区'
                        },
                        {
                            '4': '山阳区'
                        },
                        {
                            '5': '修武县'
                        },
                        {
                            '6': '博爱县'
                        },
                        {
                            '7': '武陟县'
                        },
                        {
                            '8': '温县'
                        },
                        {
                            '9': '沁阳市'
                        },
                        {
                            '10': '孟州市'
                        },
                        {
                            '11': '高新技术开发区'
                        },
                        {
                            '12': '其他区'
                        }]
        }, {
            'id': 9,
            'name': '濮阳',
            'regions': [{
                            '1': '华龙区'
                        },
                        {
                            '2': '清丰县'
                        },
                        {
                            '3': '南乐县'
                        },
                        {
                            '4': '范县'
                        },
                        {
                            '5': '台前县'
                        },
                        {
                            '6': '濮阳县'
                        },
                        {
                            '7': '高新技术产业开发区'
                        },
                        {
                            '8': '其他区'
                        }]
        }, {
            'id': 10,
            'name': '许昌',
            'regions': [{
                            '1': '魏都区'
                        },
                        {
                            '2': '许昌县'
                        },
                        {
                            '3': '鄢陵县'
                        },
                        {
                            '4': '襄城县'
                        },
                        {
                            '5': '禹州市'
                        },
                        {
                            '6': '长葛市'
                        },
                        {
                            '7': '其他区'
                        }]
        }, {
            'id': 11,
            'name': '漯河',
            'regions': [{
                            '1': '源汇区'
                        },
                        {
                            '2': '郾城区'
                        },
                        {
                            '3': '召陵区'
                        },
                        {
                            '4': '舞阳县'
                        },
                        {
                            '5': '临颍县'
                        },
                        {
                            '6': '其他区'
                        },
                        {
                            '7': '高新技术开发区'
                        }]
        }, {
            'id': 12,
            'name': '三门峡',
            'regions': [{
                            '1': '湖滨区'
                        },
                        {
                            '2': '渑池县'
                        },
                        {
                            '3': '陕县'
                        },
                        {
                            '4': '卢氏县'
                        },
                        {
                            '5': '义马市'
                        },
                        {
                            '6': '灵宝市'
                        },
                        {
                            '7': '其他区'
                        }]
        }, {
            'id': 13,
            'name': '南阳',
            'regions': [{
                            '1': '宛城区'
                        },
                        {
                            '2': '卧龙区'
                        },
                        {
                            '3': '南召县'
                        },
                        {
                            '4': '方城县'
                        },
                        {
                            '5': '西峡县'
                        },
                        {
                            '6': '镇平县'
                        },
                        {
                            '7': '内乡县'
                        },
                        {
                            '8': '淅川县'
                        },
                        {
                            '9': '社旗县'
                        },
                        {
                            '10': '唐河县'
                        },
                        {
                            '11': '新野县'
                        },
                        {
                            '12': '桐柏县'
                        },
                        {
                            '13': '邓州市'
                        },
                        {
                            '14': '其他区'
                        },
                        {
                            '15': '高新区'
                        }]
        }, {
            'id': 14,
            'name': '商丘',
            'regions': [{
                            '1': '梁园区'
                        },
                        {
                            '2': '睢阳区'
                        },
                        {
                            '3': '民权县'
                        },
                        {
                            '4': '睢县'
                        },
                        {
                            '5': '宁陵县'
                        },
                        {
                            '6': '柘城县'
                        },
                        {
                            '7': '虞城县'
                        },
                        {
                            '8': '夏邑县'
                        },
                        {
                            '9': '永城市'
                        },
                        {
                            '10': '商丘经济技术开发区'
                        },
                        {
                            '11': '其他区'
                        }]
        }, {
            'id': 15,
            'name': '信阳',
            'regions': [{
                            '1': '浉河区'
                        },
                        {
                            '2': '平桥区'
                        },
                        {
                            '3': '罗山县'
                        },
                        {
                            '4': '光山县'
                        },
                        {
                            '5': '新县'
                        },
                        {
                            '6': '商城县'
                        },
                        {
                            '7': '固始县'
                        },
                        {
                            '8': '潢川县'
                        },
                        {
                            '9': '淮滨县'
                        },
                        {
                            '10': '息县'
                        },
                        {
                            '11': '其他区'
                        }]
        }, {
            'id': 16,
            'name': '周口',
            'regions': [{
                            '1': '川汇区'
                        },
                        {
                            '2': '扶沟县'
                        },
                        {
                            '3': '西华县'
                        },
                        {
                            '4': '商水县'
                        },
                        {
                            '5': '沈丘县'
                        },
                        {
                            '6': '郸城县'
                        },
                        {
                            '7': '淮阳县'
                        },
                        {
                            '8': '太康县'
                        },
                        {
                            '9': '鹿邑县'
                        },
                        {
                            '10': '项城市'
                        },
                        {
                            '11': '经济开发区'
                        },
                        {
                            '12': '其他区'
                        }]
        }, {
            'id': 17,
            'name': '驻马店',
            'regions': [{
                            '1': '驿城区'
                        },
                        {
                            '2': '西平县'
                        },
                        {
                            '3': '上蔡县'
                        },
                        {
                            '4': '平舆县'
                        },
                        {
                            '5': '正阳县'
                        },
                        {
                            '6': '确山县'
                        },
                        {
                            '7': '泌阳县'
                        },
                        {
                            '8': '汝南县'
                        },
                        {
                            '9': '遂平县'
                        },
                        {
                            '10': '新蔡县'
                        },
                        {
                            '11': '其他区'
                        },
                        {
                            '12': '高新技术开发区'
                        }]
        }, {
            'id': 18,
            'name': '济源',
            'regions':[]
        }]
    }, {
        'id': 42,
        'name': '湖北',
        'citys': [{
            'id': 1,
            'name': '武汉',
            'regions': [{
                            '1': '江岸区'
                        },
                        {
                            '2': '江汉区'
                        },
                        {
                            '3': '硚口区'
                        },
                        {
                            '4': '汉阳区'
                        },
                        {
                            '5': '武昌区'
                        },
                        {
                            '6': '青山区'
                        },
                        {
                            '7': '洪山区'
                        },
                        {
                            '8': '东西湖区'
                        },
                        {
                            '9': '汉南区'
                        },
                        {
                            '10': '蔡甸区'
                        },
                        {
                            '11': '江夏区'
                        },
                        {
                            '12': '黄陂区'
                        },
                        {
                            '13': '新洲区'
                        },
                        {
                            '14': '武汉经济技术开发区'
                        },
                        {
                            '15': '东湖高新技术开发区'
                        },{
                            '16': '其它'
                        }]
        }, {
            'id': 2,
            'name': '黄石',
            'regions': [{
                            '1': '黄石港区'
                        },
                        {
                            '2': '西塞山区'
                        },
                        {
                            '3': '下陆区'
                        },
                        {
                            '4': '铁山区'
                        },
                        {
                            '5': '阳新县'
                        },
                        {
                            '6': '大冶市'
                        },
                        {
                            '7': '团城开发区'
                        },{
                            '8': '其它'
                        }]
        }, {
            'id': 3,
            'name': '十堰',
            'regions': [{
                            '1': '茅箭区'
                        },
                        {
                            '2': '张湾区'
                        },
                        {
                            '3': '郧县'
                        },
                        {
                            '4': '郧西县'
                        },
                        {
                            '5': '竹山县'
                        },
                        {
                            '6': '竹溪县'
                        },
                        {
                            '7': '房县'
                        },
                        {
                            '8': '丹江口市'
                        },
                        {
                            '9': '白浪高新技术开发区'
                        },
                        {
                            '10': '武当山特区'
                        },
                        {
                            '11': '西城开发区'
                        },{
                            '12': '其它'
                        }]
        }, {
            'id': 5,
            'name': '宜昌',
            'regions': [{
                            '1': '西陵区'
                        },
                        {
                            '2': '伍家岗区'
                        },
                        {
                            '3': '点军区'
                        },
                        {
                            '4': '猇亭区'
                        },
                        {
                            '5': '夷陵区'
                        },
                        {
                            '6': '远安县'
                        },
                        {
                            '7': '兴山县'
                        },
                        {
                            '8': '秭归县'
                        },
                        {
                            '9': '长阳土家族自治县'
                        },
                        {
                            '10': '五峰土家族自治县'
                        },
                        {
                            '11': '宜都市'
                        },
                        {
                            '12': '当阳市'
                        },
                        {
                            '13': '枝江市'
                        },
                        {
                            '14': '宜昌开发区'
                        },
                        {
                            '15': '葛洲坝工业区'
                        },{
                            '16': '其它'
                        }]
        }, {
            'id': 6,
            'name': '襄樊',
            'regions': [{
                            '1': '襄城区'
                        },
                        {
                            '2': '樊城区'
                        },
                        {
                            '3': '襄阳区'
                        },
                        {
                            '4': '南漳县'
                        },
                        {
                            '5': '谷城县'
                        },
                        {
                            '6': '保康县'
                        },
                        {
                            '7': '老河口市'
                        },
                        {
                            '8': '枣阳市'
                        },
                        {
                            '9': '宜城市'
                        },{
                            '10': '其它'
                        }]
        }, {
            'id': 7,
            'name': '鄂州',
            'regions': [{
                            '1': '梁子湖区'
                        },
                        {
                            '2': '华容区'
                        },
                        {
                            '3': '鄂城区'
                        },
                        {
                            '4': '花湖经济开发区'
                        },{
                            '5': '其它'
                        }]
        }, {
            'id': 8,
            'name': '荆门',
            'regions': [{
                            '1': '东宝区'
                        },
                        {
                            '2': '掇刀区'
                        },
                        {
                            '3': '京山县'
                        },
                        {
                            '4': '沙洋县'
                        },
                        {
                            '5': '钟祥市'
                        },{
                            '6': '其它'
                        }]
        }, {
            'id': 9,
            'name': '孝感',
            'regions': [{
                            '1': '孝南区'
                        },
                        {
                            '2': '孝昌县'
                        },
                        {
                            '3': '大悟县'
                        },
                        {
                            '4': '云梦县'
                        },
                        {
                            '5': '应城市'
                        },
                        {
                            '6': '安陆市'
                        },
                        {
                            '7': '汉川市'
                        },
                        {
                            '8': '孝感开发区'
                        },{
                            '9': '其它'
                        }]
        }, {
            'id': 10,
            'name': '荆州',
            'regions': [{
                            '1': '沙市区'
                        },
                        {
                            '2': '荆州区'
                        },
                        {
                            '3': '公安县'
                        },
                        {
                            '4': '监利县'
                        },
                        {
                            '5': '江陵县'
                        },
                        {
                            '6': '石首市'
                        },
                        {
                            '7': '洪湖市'
                        },
                        {
                            '8': '松滋市'
                        },{
                            '9': '其它'
                        }]
        }, {
            'id': 11,
            'name': '黄冈',
            'regions': [{
                            '1': '黄州区'
                        },
                        {
                            '2': '团风县'
                        },
                        {
                            '3': '红安县'
                        },
                        {
                            '4': '罗田县'
                        },
                        {
                            '5': '英山县'
                        },
                        {
                            '6': '浠水县'
                        },
                        {
                            '7': '蕲春县'
                        },
                        {
                            '8': '黄梅县'
                        },
                        {
                            '9': '麻城市'
                        },
                        {
                            '10': '武穴市'
                        },{
                            '11': '其它'
                        }]
        }, {
            'id': 12,
            'name': '咸宁',
            'regions': [{
                            '1': '咸安区'
                        },
                        {
                            '2': '嘉鱼县'
                        },
                        {
                            '3': '通城县'
                        },
                        {
                            '4': '崇阳县'
                        },
                        {
                            '5': '通山县'
                        },
                        {
                            '6': '赤壁市'
                        },
                        {
                            '7': '温泉城区'
                        },{
                            '8': '其它'
                        }]
        }, {
            'id': 13,
            'name': '随州',
            'regions': [{
                            '1': '曾都区'
                        },
                        {
                            '2': '广水市'
                        },{
                            '3': '其它'
                        }]
        }, {
            'id': 27,
            'name': '恩施',
            'regions': [{
                            '1': '恩施市'
                        },
                        {
                            '2': '利川市'
                        },
                        {
                            '3': '建始县'
                        },
                        {
                            '4': '巴东县'
                        },
                        {
                            '5': '宣恩县'
                        },
                        {
                            '6': '咸丰县'
                        },
                        {
                            '7': '来凤县'
                        },
                        {
                            '8': '鹤峰县'
                        },{
                            '9': '其它'
                        }]
        },{
            'id': 26,
            'name': '襄阳',
            'regions': [{
                            '1': '保康县'
                        },
                        {
                            '2': '樊城区'
                        },
                        {
                            '3': '宜城市'
                        },
                        {
                            '4': '襄阳区'
                        },
                        {
                            '5': '南漳县'
                        },
                        {
                            '6': '老河口市'
                        },
                        {
                            '7': '谷城县'
                        },
                        {
                            '8': '襄城区'
                        },
                        {
                            '9': '枣阳市'
                        },{
                            '10': '其它'
                        }]
        }, {
            'id': 29,
            'name': '仙桃',
            'regions': []
        }, {
            'id': 30,
            'name': '潜江',
            'regions': []
        }, {
            'id': 31,
            'name': '天门',
            'regions': []
        }, {
            'id': 32,
            'name': '神农架',
            'regions': []
        }, {
            'id': 33,
            'name': '宜都',
            'regions': []
        }]
    }, {
        'id': 43,
        'name': '湖南',
        'citys': [{
            'id': 1,
            'name': '长沙',
            'regions': [{
                            '1': '芙蓉区'
                        },
                        {
                            '2': '天心区'
                        },
                        {
                            '3': '岳麓区'
                        },
                        {
                            '4': '开福区'
                        },
                        {
                            '5': '雨花区'
                        },
                        {
                            '6': '长沙县'
                        },
                        {
                            '7': '望城县'
                        },
                        {
                            '8': '宁乡县'
                        },
                        {
                            '9': '浏阳市'
                        },{
                            '10': '其它'
                        }]
        }, {
            'id': 2,
            'name': '株洲',
            'regions': [{
                            '1': '荷塘区'
                        },
                        {
                            '2': '芦淞区'
                        },
                        {
                            '3': '石峰区'
                        },
                        {
                            '4': '天元区'
                        },
                        {
                            '5': '株洲县'
                        },
                        {
                            '6': '攸县'
                        },
                        {
                            '7': '茶陵县'
                        },
                        {
                            '8': '炎陵县'
                        },
                        {
                            '9': '醴陵市'
                        },{
                            '10': '其它'
                        }]
        }, {
            'id': 3,
            'name': '湘潭',
            'regions': [{
                            '1': '雨湖区'
                        },
                        {
                            '2': '岳塘区'
                        },
                        {
                            '3': '湘潭县'
                        },
                        {
                            '4': '湘乡市'
                        },
                        {
                            '5': '韶山市'
                        },{
                            '6': '其它'
                        }]
        }, {
            'id': 4,
            'name': '衡阳',
            'regions': [{
                            '1': '珠晖区'
                        },
                        {
                            '2': '雁峰区'
                        },
                        {
                            '3': '石鼓区'
                        },
                        {
                            '4': '蒸湘区'
                        },
                        {
                            '5': '南岳区'
                        },
                        {
                            '6': '衡阳县'
                        },
                        {
                            '7': '衡南县'
                        },
                        {
                            '8': '衡山县'
                        },
                        {
                            '9': '衡东县'
                        },
                        {
                            '10': '祁东县'
                        },
                        {
                            '11': '耒阳市'
                        },
                        {
                            '12': '常宁市'
                        },{
                            '13': '其它'
                        }]
        }, {
            'id': 5,
            'name': '邵阳',
            'regions': [{
                            '1': '双清区'
                        },
                        {
                            '2': '大祥区'
                        },
                        {
                            '3': '北塔区'
                        },
                        {
                            '4': '邵东县'
                        },
                        {
                            '5': '新邵县'
                        },
                        {
                            '6': '邵阳县'
                        },
                        {
                            '7': '隆回县'
                        },
                        {
                            '8': '洞口县'
                        },
                        {
                            '9': '绥宁县'
                        },
                        {
                            '10': '新宁县'
                        },
                        {
                            '11': '城步苗族自治县'
                        },
                        {
                            '12': '武冈市'
                        },{
                            '13': '其它'
                        }]
        }, {
            'id': 6,
            'name': '岳阳',
            'regions': [{
                            '1': '岳阳楼区'
                        },
                        {
                            '2': '云溪区'
                        },
                        {
                            '3': '君山区'
                        },
                        {
                            '4': '岳阳县'
                        },
                        {
                            '5': '华容县'
                        },
                        {
                            '6': '湘阴县'
                        },
                        {
                            '7': '平江县'
                        },
                        {
                            '8': '汨罗市'
                        },
                        {
                            '9': '临湘市'
                        },
                        {
                            '10': '岳阳经济开发区'
                        },{
                            '11': '其它'
                        }]
        }, {
            'id': 7,
            'name': '常德',
            'regions': [{
                            '1': '武陵区'
                        },
                        {
                            '2': '鼎城区'
                        },
                        {
                            '3': '安乡县'
                        },
                        {
                            '4': '汉寿县'
                        },
                        {
                            '5': '澧县'
                        },
                        {
                            '6': '临澧县'
                        },
                        {
                            '7': '桃源县'
                        },
                        {
                            '8': '石门县'
                        },
                        {
                            '9': '津市市'
                        },
                        {
                            '10': '德山经济开发区'
                        },{
                            '11': '其它'
                        }]
        }, {
            'id': 8,
            'name': '张家界',
            'regions': [{
                            '1': '永定区'
                        },
                        {
                            '2': '武陵源区'
                        },
                        {
                            '3': '慈利县'
                        },
                        {
                            '4': '桑植县'
                        },{
                            '5': '其它'
                        }]
        }, {
            'id': 9,
            'name': '益阳',
            'regions': [{
                            '1': '资阳区'
                        },
                        {
                            '2': '赫山区'
                        },
                        {
                            '3': '南县'
                        },
                        {
                            '4': '桃江县'
                        },
                        {
                            '5': '安化县'
                        },
                        {
                            '6': '沅江市'
                        },
                        {
                            '7': '高新区'
                        },
                        {
                            '8': '朝阳经济开发区'
                        },{
                            '9': '其它'
                        }]
        }, {
            'id': 10,
            'name': '郴州',
            'regions': [{
                            '1': '北湖区'
                        },
                        {
                            '2': '苏仙区'
                        },
                        {
                            '3': '桂阳县'
                        },
                        {
                            '4': '宜章县'
                        },
                        {
                            '5': '永兴县'
                        },
                        {
                            '6': '嘉禾县'
                        },
                        {
                            '7': '临武县'
                        },
                        {
                            '8': '汝城县'
                        },
                        {
                            '9': '桂东县'
                        },
                        {
                            '10': '安仁县'
                        },
                        {
                            '11': '资兴市'
                        },{
                            '12': '其它'
                        }]
        }, {
            'id': 11,
            'name': '永州',
            'regions': [{
                            '1': '零陵区'
                        },
                        {
                            '2': '冷水滩区'
                        },
                        {
                            '3': '祁阳县'
                        },
                        {
                            '4': '东安县'
                        },
                        {
                            '5': '双牌县'
                        },
                        {
                            '6': '道县'
                        },
                        {
                            '7': '江永县'
                        },
                        {
                            '8': '宁远县'
                        },
                        {
                            '9': '蓝山县'
                        },
                        {
                            '10': '新田县'
                        },
                        {
                            '11': '江华瑶族自治县'
                        },{
                            '12': '其它'
                        }]
        }, {
            'id': 12,
            'name': '怀化',
            'regions': [{
                            '1': '鹤城区'
                        },
                        {
                            '2': '中方县'
                        },
                        {
                            '3': '沅陵县'
                        },
                        {
                            '4': '辰溪县'
                        },
                        {
                            '5': '溆浦县'
                        },
                        {
                            '6': '会同县'
                        },
                        {
                            '7': '麻阳苗族自治县'
                        },
                        {
                            '8': '新晃侗族自治县'
                        },
                        {
                            '9': '芷江侗族自治县'
                        },
                        {
                            '10': '靖州苗族侗族自治县'
                        },
                        {
                            '11': '通道侗族自治县'
                        },
                        {
                            '12': '洪江市'
                        },
                        {
                            '13': '河西开发区'
                        },
                        {
                            '14': '胡天开发区'
                        },{
                            '15': '其它'
                        }]
        }, {
            'id': 13,
            'name': '娄底',
            'regions': [{
                            '1': '娄星区'
                        },
                        {
                            '2': '双峰县'
                        },
                        {
                            '3': '新化县'
                        },
                        {
                            '4': '冷水江市'
                        },
                        {
                            '5': '涟源市'
                        },
                        {
                            '6': '经济开发区'
                        },{
                            '7': '其它'
                        }]
        }, {
            'id': 31,
            'name': '土家族苗族自治州',
            'regions': [{
                            '1': '吉首市'
                        },
                        {
                            '2': '泸溪县'
                        },
                        {
                            '3': '凤凰县'
                        },
                        {
                            '4': '花垣县'
                        },
                        {
                            '5': '保靖县'
                        },
                        {
                            '6': '古丈县'
                        },
                        {
                            '7': '永顺县'
                        },
                        {
                            '8': '龙山县'
                        },{
                            '9': '其它'
                        }]
        }]
    }, {
        'id': 44,
        'name': '广东',
        'citys': [{
            'id': 1,
            'name': '广州',
            'regions': [{
                            '1': '荔湾区'
                        },
                        {
                            '2': '越秀区'
                        },
                        {
                            '3': '海珠区'
                        },
                        {
                            '4': '天河区'
                        },
                        {
                            '5': '白云区'
                        },
                        {
                            '6': '黄埔区'
                        },
                        {
                            '7': '番禺区'
                        },
                        {
                            '8': '花都区'
                        },
                        {
                            '9': '南沙区'
                        },
                        {
                            '10': '萝岗区'
                        },
                        {
                            '11': '增城市'
                        },
                        {
                            '12': '从化市'
                        },
                        {
                            '13': '东山区'
                        },{
                            '14': '其它'
                        }]
        }, {
            'id': 2,
            'name': '韶关',
            'regions': [{
                            '1': '武江区'
                        },
                        {
                            '2': '浈江区'
                        },
                        {
                            '3': '曲江区'
                        },
                        {
                            '4': '始兴县'
                        },
                        {
                            '5': '仁化县'
                        },
                        {
                            '6': '翁源县'
                        },
                        {
                            '7': '乳源瑶族自治县'
                        },
                        {
                            '8': '新丰县'
                        },
                        {
                            '9': '乐昌市'
                        },
                        {
                            '10': '南雄市'
                        },{
                            '11': '其它'
                        }]
        }, {
            'id': 3,
            'name': '深圳',
            'regions': [{
                            '1': '罗湖区'
                        },
                        {
                            '2': '福田区'
                        },
                        {
                            '3': '南山区'
                        },
                        {
                            '4': '宝安区'
                        },
                        {
                            '5': '龙岗区'
                        },
                        {
                            '6': '盐田区'
                        },{
                            '7': '其它'
                        }]
        }, {
            'id': 4,
            'name': '珠海',
            'regions': [{
                            '1': '香洲区'
                        },
                        {
                            '2': '斗门区'
                        },
                        {
                            '3': '金湾区'
                        },
                        {
                            '4': '其他区'
                        }]
        }, {
            'id': 5,
            'name': '汕头',
            'regions': [{
                            '1': '龙湖区'
                        },
                        {
                            '2': '金平区'
                        },
                        {
                            '3': '濠江区'
                        },
                        {
                            '4': '潮阳区'
                        },
                        {
                            '5': '潮南区'
                        },
                        {
                            '6': '澄海区'
                        },
                        {
                            '7': '南澳县'
                        },{
                            '8': '其它'
                        }]
        }, {
            'id': 6,
            'name': '佛山',
            'regions': [{
                            '1': '禅城区'
                        },
                        {
                            '2': '南海区'
                        },
                        {
                            '3': '顺德区'
                        },
                        {
                            '4': '三水区'
                        },
                        {
                            '5': '高明区'
                        },
                        {
                            '6': '其他区'
                        }]
        }, {
            'id': 7,
            'name': '江门',
            'regions': [{
                            '1': '蓬江区'
                        },
                        {
                            '2': '江海区'
                        },
                        {
                            '3': '新会区'
                        },
                        {
                            '4': '台山市'
                        },
                        {
                            '5': '开平市'
                        },
                        {
                            '6': '鹤山市'
                        },
                        {
                            '7': '恩平市'
                        },{
                            '8': '其它'
                        }]
        }, {
            'id': 8,
            'name': '湛江',
            'regions': [{
                            '1': '赤坎区'
                        },
                        {
                            '2': '霞山区'
                        },
                        {
                            '3': '坡头区'
                        },
                        {
                            '4': '麻章区'
                        },
                        {
                            '5': '遂溪县'
                        },
                        {
                            '6': '徐闻县'
                        },
                        {
                            '7': '廉江市'
                        },
                        {
                            '8': '雷州市'
                        },
                        {
                            '9': '吴川市'
                        },
                        {
                            '10': '湛江经济开发区'
                        },{
                            '11': '其它'
                        }]
        }, {
            'id': 9,
            'name': '茂名',
            'regions': [{
                            '1': '茂南区'
                        },
                        {
                            '2': '茂港区'
                        },
                        {
                            '3': '电白县'
                        },
                        {
                            '4': '高州市'
                        },
                        {
                            '5': '化州市'
                        },
                        {
                            '6': '信宜市'
                        },{
                            '7': '其它'
                        }]
        }, {
            'id': 12,
            'name': '肇庆',
            'regions': [{
                            '1': '端州区'
                        },
                        {
                            '2': '鼎湖区'
                        },
                        {
                            '3': '广宁县'
                        },
                        {
                            '4': '怀集县'
                        },
                        {
                            '5': '封开县'
                        },
                        {
                            '6': '德庆县'
                        },
                        {
                            '7': '高要市'
                        },
                        {
                            '8': '四会市'
                        },
                        {
                            '9': '大旺高新技术开发区'
                        },{
                            '10': '其它'
                        }]
        }, {
            'id': 13,
            'name': '惠州',
            'regions': [{
                            '1': '惠城区'
                        },
                        {
                            '2': '惠阳区'
                        },
                        {
                            '3': '博罗县'
                        },
                        {
                            '4': '惠东县'
                        },
                        {
                            '5': '龙门县'
                        },
                        {
                            '6': '大亚湾区'
                        },{
                            '7': '其它'
                        }]
        }, {
            'id': 14,
            'name': '梅州',
            'regions': [{
                            '1': '梅江区'
                        },
                        {
                            '2': '梅县'
                        },
                        {
                            '3': '大埔县'
                        },
                        {
                            '4': '丰顺县'
                        },
                        {
                            '5': '五华县'
                        },
                        {
                            '6': '平远县'
                        },
                        {
                            '7': '蕉岭县'
                        },
                        {
                            '8': '兴宁市'
                        },{
                            '9': '其它'
                        }]
        }, {
            'id': 15,
            'name': '汕尾',
            'regions': [{
                            '1': '城区'
                        },
                        {
                            '2': '海丰县'
                        },
                        {
                            '3': '陆河县'
                        },
                        {
                            '4': '陆丰市'
                        },
                        {
                            '5': '红海湾区'
                        },{
                            '6': '其它'
                        }]
        }, {
            'id': 16,
            'name': '河源',
            'regions': [{
                            '1': '源城区'
                        },
                        {
                            '2': '紫金县'
                        },
                        {
                            '3': '龙川县'
                        },
                        {
                            '4': '连平县'
                        },
                        {
                            '5': '和平县'
                        },
                        {
                            '6': '东源县'
                        },
                        {
                            '7': '高新区'
                        },
                        {
                            '8': '新市区'
                        },{
                            '9': '其它'
                        }]
        }, {
            'id': 17,
            'name': '阳江',
            'regions': [{
                            '1': '江城区'
                        },
                        {
                            '2': '阳西县'
                        },
                        {
                            '3': '阳东县'
                        },
                        {
                            '4': '阳春市'
                        },{
                            '5': '其它'
                        }]
        }, {
            'id': 18,
            'name': '清远',
            'regions': [{
                            '1': '清城区'
                        },
                        {
                            '2': '佛冈县'
                        },
                        {
                            '3': '阳山县'
                        },
                        {
                            '4': '连山壮族瑶族自治县'
                        },
                        {
                            '5': '连南瑶族自治县'
                        },
                        {
                            '6': '清新县'
                        },
                        {
                            '7': '英德市'
                        },
                        {
                            '8': '连州市'
                        },{
                            '9': '其它'
                        }]
        }, {
            'id': 19,
            'name': '东莞',
            'regions': [{
                            '1': '常平镇'
                        },
                        {
                            '2': '石龙镇'
                        },
                        {
                            '3': '长安镇'
                        },
                        {
                            '4': '凤岗镇'
                        },
                        {
                            '5': '南城区'
                        },
                        {
                            '6': '道滘镇'
                        },
                        {
                            '7': '石碣镇'
                        },
                        {
                            '8': '中堂镇'
                        },
                        
                        {
                            '9': '黄江镇'
                        },
                        {
                            '10': '虎门镇'
                        },
                        {
                            '11': '塘厦镇'
                        },
                        {
                            '12': '万江街道'
                        },
                        {
                            '13': '石排镇'
                        },
                        {
                            '14': '洪梅镇'
                        },
                        {
                            '15': '大朗镇'
                        },
                        {
                            '16': '茶山镇'
                        },
                        {
                            '17': '高埗镇'
                        },
                        {
                            '18': '东城区'
                        },
                        {
                            '19': '樟木头镇'
                        },
                        {
                            '20': '横沥镇'
                        },
                        {
                            '21': '厚街镇'
                        },
                        {
                            '22': '清溪镇'
                        },
                        {
                            '23': '莞城街道'
                        },
                        {
                            '24': '麻涌镇'
                        },
                        {
                            '25': '东城街道'
                        },
                        {
                            '26': '谢岗镇'
                        },
                        {
                            '27': '桥头镇'
                        },
                        {
                            '28': '大岭山镇'
                        },
                        {
                            '29': '企石镇'
                        },
                        {
                            '30': '沙田镇'
                        },
                        {
                            '31': '东坑镇'
                        },
                        {
                            '32': '望牛墩镇'
                        },
                        {
                            '33': '松山湖'
                        },
                        {
                            '34': '寮步镇'
                        },{
                            '35': '其它'
                        }]
        }, {
            'id': 20,
            'name': '中山',
            'regions': [{
                            '1': '五桂山'
                        },
                        {
                            '2': '坦洲'
                        },
                        {
                            '3': '东凤'
                        },
                        {
                            '4': '南区'
                        },
                        {
                            '5': '大涌'
                        },
                        {
                            '6': '三角'
                        },
                        {
                            '7': '三乡'
                        },
                        {
                            '8': '古镇'
                        },
                        
                        {
                            '9': '石岐区'
                        },
                        {
                            '10': '南头'
                        },
                        {
                            '11': '火炬区'
                        },
                        {
                            '12': '沙溪'
                        },
                        {
                            '13': '民众'
                        },
                        {
                            '14': '板芙'
                        },
                        {
                            '15': '小榄'
                        },
                        {
                            '16': '西区'
                        },
                        {
                            '17': '港口'
                        },
                        {
                            '18': '黄圃'
                        },
                        {
                            '19': '南朗'
                        },
                        {
                            '20': '神湾'
                        },
                        {
                            '21': '东升'
                        },
                        {
                            '22': '东区'
                        },
                        {
                            '23': '横栏'
                        },
                        {
                            '24': '阜沙'
                        },{
                            '25': '其它'
                        }]
        }, {
            'id': 51,
            'name': '潮州',
            'regions': [{
                            '1': '湘桥区'
                        },
                        {
                            '2': '潮安县'
                        },
                        {
                            '3': '饶平县'
                        },
                        {
                            '4': '枫溪区'
                        },{
                            '5': '其它'
                        }]
        }, {
            'id': 52,
            'name': '揭阳',
            'regions': [{
                            '1': '榕城区'
                        },
                        {
                            '2': '揭东县'
                        },
                        {
                            '3': '揭西县'
                        },
                        {
                            '4': '惠来县'
                        },
                        {
                            '5': '普宁市'
                        },
                        {
                            '6': '经济开发试验区'
                        },
                        {
                            '7': '渔湖经济开发区'
                        },
                        {
                            '8': '东山'
                        },{
                            '9': '其它'
                        }]
        }, {
            'id': 53,
            'name': '云浮',
            'regions': [{
                            '1': '云城区'
                        },
                        {
                            '2': '新兴县'
                        },
                        {
                            '3': '郁南县'
                        },
                        {
                            '4': '云安县'
                        },
                        {
                            '5': '罗定市'
                        },{
                            '6': '其它'
                        }]
        }]
    }, {
        'id': 45,
        'name': '广西',
        'citys': [{
            'id': 1,
            'name': '南宁',
            'regions': [{
                            '1': '兴宁区'
                        },
                        {
                            '2': '青秀区'
                        },
                        {
                            '3': '江南区'
                        },
                        {
                            '4': '西乡塘区'
                        },
                        {
                            '5': '良庆区'
                        },
                        {
                            '6': '邕宁区'
                        },
                        {
                            '7': '武鸣县'
                        },
                        {
                            '8': '隆安县'
                        },
                        {
                            '9': '马山县'
                        },
                        {
                            '10': '上林县'
                        },
                        {
                            '11': '宾阳县'
                        },
                        {
                            '12': '横县'
                        },{
                            '13': '其它'
                        }]
        }, {
            'id': 2,
            'name': '柳州',
            'regions': [{
                            '1': '城中区'
                        },
                        {
                            '2': '鱼峰区'
                        },
                        {
                            '3': '柳南区'
                        },
                        {
                            '4': '柳北区'
                        },
                        {
                            '5': '柳江县'
                        },
                        {
                            '6': '柳城县'
                        },
                        {
                            '7': '鹿寨县'
                        },
                        {
                            '8': '融安县'
                        },
                        {
                            '9': '融水苗族自治县'
                        },
                        {
                            '10': '三江侗族自治县'
                        },
                        {
                            '11': '柳东新区'
                        },{
                            '12': '其它'
                        }]
        }, {
            'id': 3,
            'name': '桂林',
            'regions': [{
                            '1': '秀峰区'
                        },
                        {
                            '2': '叠彩区'
                        },
                        {
                            '3': '象山区'
                        },
                        {
                            '4': '七星区'
                        },
                        {
                            '5': '雁山区'
                        },
                        {
                            '6': '阳朔县'
                        },
                        {
                            '7': '临桂县'
                        },
                        {
                            '8': '灵川县'
                        },
                        {
                            '9': '全州县'
                        },
                        {
                            '10': '兴安县'
                        },
                        {
                            '11': '永福县'
                        },
                        {
                            '12': '灌阳县'
                        },
                        {
                            '13': '龙胜各族自治县'
                        },
                        {
                            '14': '资源县'
                        },
                        {
                            '15': '平乐县'
                        },
                        {
                            '16': '荔蒲县'
                        },
                        {
                            '17': '恭城瑶族自治县'
                        },{
                            '18': '其它'
                        }]
        }, {
            'id': 4,
            'name': '梧州',
            'regions': [{
                            '1': '万秀区'
                        },
                        {
                            '2': '蝶山区'
                        },
                        {
                            '3': '长洲区'
                        },
                        {
                            '4': '苍梧县'
                        },
                        {
                            '5': '藤县'
                        },
                        {
                            '6': '蒙山县'
                        },
                        {
                            '7': '岑溪市'
                        },{
                            '8': '其它'
                        }]
        }, {
            'id': 5,
            'name': '北海',
            'regions': [{
                            '1': '海城区'
                        },
                        {
                            '2': '银海区'
                        },
                        {
                            '3': '铁山港区'
                        },
                        {
                            '4': '合浦县'
                        },{
                            '5': '其它'
                        }]
        }, {
            'id': 6,
            'name': '防城港',
            'regions': [{
                            '1': '港口区'
                        },
                        {
                            '2': '防城区'
                        },
                        {
                            '3': '上思县'
                        },
                        {
                            '4': '东兴市'
                        },{
                            '5': '其它'
                        }]
        }, {
            'id': 7,
            'name': '钦州',
            'regions': [{
                            '1': '钦南区'
                        },
                        {
                            '2': '钦北区'
                        },
                        {
                            '3': '灵山县'
                        },
                        {
                            '4': '浦北县'
                        },{
                            '5': '其它'
                        }]
        }, {
            'id': 8,
            'name': '贵港',
            'regions': [{
                            '1': '港北区'
                        },
                        {
                            '2': '港南区'
                        },
                        {
                            '3': '覃塘区'
                        },
                        {
                            '4': '平南县'
                        },
                        {
                            '5': '桂平市'
                        },{
                            '6': '其它'
                        }]
        }, {
            'id': 9,
            'name': '玉林',
            'regions': [{
                            '1': '玉州区'
                        },
                        {
                            '2': '容县'
                        },
                        {
                            '3': '陆川县'
                        },
                        {
                            '4': '博白县'
                        },
                        {
                            '5': '兴业县'
                        },
                        {
                            '6': '北流市'
                        },{
                            '7': '其它'
                        }]
        }, {
            'id': 10,
            'name': '百色',
            'regions': [{
                            '1': '右江区'
                        },
                        {
                            '2': '田阳县'
                        },
                        {
                            '3': '田东县'
                        },
                        {
                            '4': '平果县'
                        },
                        {
                            '5': '德保县'
                        },
                        {
                            '6': '靖西县'
                        },
                        {
                            '7': '那坡县'
                        },
                        {
                            '8': '凌云县'
                        },
                        {
                            '9': '乐业县'
                        },
                        {
                            '10': '田林县'
                        },
                        {
                            '11': '西林县'
                        },
                        {
                            '12': '隆林各族自治县'
                        },{
                            '13': '其它'
                        }]
        }, {
            'id': 11,
            'name': '贺州',
            'regions': [{
                            '1': '八步区'
                        },
                        {
                            '2': '昭平县'
                        },
                        {
                            '3': '钟山县'
                        },
                        {
                            '4': '富川瑶族自治县'
                        },{
                            '5': '其它'
                        }]
        }, {
            'id': 12,
            'name': '河池',
            'regions': [{
                            '1': '金城江区'
                        },
                        {
                            '2': '南丹县'
                        },
                        {
                            '3': '天峨县'
                        },
                        {
                            '4': '凤山县'
                        },
                        {
                            '5': '东兰县'
                        },
                        {
                            '6': '罗城仫佬族自治县'
                        },
                        {
                            '7': '环江毛南族自治县'
                        },
                        {
                            '8': '巴马瑶族自治县'
                        },
                        {
                            '9': '都安瑶族自治县'
                        },
                        {
                            '10': '大化瑶族自治县'
                        },
                        {
                            '11': '宜州市'
                        },{
                            '12': '其它'
                        }]
        }, {
            'id': 13,
            'name': '来宾',
            'regions': [{
                            '1': '兴宾区'
                        },
                        {
                            '2': '忻城县'
                        },
                        {
                            '3': '象州县'
                        },
                        {
                            '4': '武宣县'
                        },
                        {
                            '5': '金秀瑶族自治县'
                        },
                        {
                            '6': '合山市'
                        },{
                            '7': '其它'
                        }]
        }, {
            'id': 14,
            'name': '崇左',
            'regions': [{
                            '1': '江洲区'
                        },
                        {
                            '2': '扶绥县'
                        },
                        {
                            '3': '宁明县'
                        },
                        {
                            '4': '龙州县'
                        },
                        {
                            '5': '大新县'
                        },
                        {
                            '6': '天等县'
                        },
                        {
                            '7': '凭祥市'
                        },{
                            '8': '其它'
                        }]
        }]
    }, {
        'id': 46,
        'name': '海南',
        'citys': [{
            'id': 1,
            'name': '海口',
            'regions': [{
                            '1': '秀英区'
                        },
                        {
                            '2': '龙华区'
                        },
                        {
                            '3': '琼山区'
                        },
                        {
                            '4': '美兰区'
                        },
                        {
                            '5': '港澳开发区'
                        },{
                            '6': '其它'
                        }]
        }, {
            'id': 2,
            'name': '三亚',
            'regions': [{
                            '1': '田独镇'
                        },
                        {
                            '2': '育才镇'
                        },
                        {
                            '3': '河西区（虚拟街道办）'
                        },
                        {
                            '4': '凤凰镇'
                        },
                        {
                            '5': '河东区（虚拟街道办）'
                        },
                        {
                            '6': '崖城镇'
                        },
                        {
                            '7': '海棠湾镇'
                        },
                        {
                            '8': '天涯镇'
                        },{
                            '9': '其它'
                        }]
        }, {
            'id': 3,
            'name': '五指山',
            'regions': []
        }, {
            'id': 4,
            'name': '琼海',
            'regions': []
        }, {
            'id': 5,
            'name': '儋州',
            'regions': []
        }, {
            'id': 6,
            'name': '文昌 ',
            'regions': []
        }, {
            'id': 7,
            'name': '万宁',
            'regions': []
        }, {
            'id': 8,
            'name': '东方',
            'regions': []
        }, {
            'id': 9,
            'name': '定安县',
            'regions': []
        }, {
            'id': 10,
            'name': '澄迈县',
            'regions': []
        }, {
            'id': 11,
            'name': '乐东黎族自治县',
            'regions': []
        }, {
            'id': 12,
            'name': '临高县',
            'regions': []
        }, {
            'id': 13,
            'name': '保亭黎族苗族自治县',
            'regions': []
        }, {
            'id': 14,
            'name': '陵水黎族自治县',
            'regions': []
        }, {
            'id': 15,
            'name': '昌江黎族自治县',
            'regions': []
        }, {
            'id': 16,
            'name': '琼中黎族苗族自治县',
            'regions': []
        }, {
            'id': 17,
            'name': '西南中沙群岛办事处',
            'regions': []
        }, {
            'id': 18,
            'name': '白沙黎族自治县',
            'regions': []
        },{
            'id': 19,
            'name': '屯昌县',
            'regions': []
        }]
    }, {
        'id': 50,
        'name': '重庆',
        'citys': [{
            'id': 1,
            'name': '万州区',
            'regions': []
        }, {
            'id': 2,
            'name': '涪陵区',
            'regions': []
        }, {
            'id': 3,
            'name': '渝中区',
            'regions': []
        }, {
            'id': 4,
            'name': '大渡口区',
            'regions': []
        }, {
            'id': 5,
            'name': '江北区',
            'regions': []
        }, {
            'id': 6,
            'name': '沙坪坝区',
            'regions': []
        }, {
            'id': 7,
            'name': '九龙坡区',
            'regions': []
        }, {
            'id': 8,
            'name': '南岸区',
            'regions': []
        }, {
            'id': 9,
            'name': '北碚区',
            'regions': []
        }, {
            'id': 10,
            'name': '万盛区',
            'regions': []
        }, {
            'id': 11,
            'name': '双桥区',
            'regions': []
        }, {
            'id': 12,
            'name': '渝北区',
            'regions': []
        }, {
            'id': 13,
            'name': '巴南区',
            'regions': []
        }, {
            'id': 14,
            'name': '黔江区',
            'regions': []
        }, {
            'id': 15,
            'name': '长寿区',
            'regions': []
        }, {
            'id': 22,
            'name': '綦江县',
            'regions': []
        }, {
            'id': 23,
            'name': '潼南县',
            'regions': []
        }, {
            'id': 24,
            'name': '铜梁县',
            'regions': []
        }, {
            'id': 25,
            'name': '大足县',
            'regions': []
        }, {
            'id': 26,
            'name': '荣昌县',
            'regions': []
        }, {
            'id': 27,
            'name': '璧山县',
            'regions': []
        }, {
            'id': 28,
            'name': '梁平县',
            'regions': []
        }, {
            'id': 29,
            'name': '城口县',
            'regions': []
        }, {
            'id': 30,
            'name': '丰都县',
            'regions': []
        }, {
            'id': 31,
            'name': '垫江县',
            'regions': []
        }, {
            'id': 32,
            'name': '武隆县',
            'regions': []
        }, {
            'id': 33,
            'name': '忠县',
            'regions': []
        }, {
            'id': 34,
            'name': '开县',
            'regions': []
        }, {
            'id': 35,
            'name': '云阳县',
            'regions': []
        }, {
            'id': 36,
            'name': '奉节县',
            'regions': []
        }, {
            'id': 37,
            'name': '巫山县',
            'regions': []
        }, {
            'id': 38,
            'name': '巫溪县',
            'regions': []
        }, {
            'id': 40,
            'name': '石柱土家族自治县',
            'regions': []
        }, {
            'id': 41,
            'name': '秀山土家族苗族自治县',
            'regions': []
        }, {
            'id': 42,
            'name': '酉阳土家族苗族自治县',
            'regions': []
        }, {
            'id': 43,
            'name': '彭水苗族土家族自治县',
            'regions': []
        }, {
            'id': 81,
            'name': '江津市',
            'regions': []
        }, {
            'id': 82,
            'name': '合川市',
            'regions': []
        }, {
            'id': 83,
            'name': '永川市',
            'regions': []
        }, {
            'id': 84,
            'name': '南川市',
            'regions': []
        },{
            'id': 86,
            'name': '高新区',
            'regions': []
        },{
            'id': 87,
            'name': '其他区',
            'regions':[]
        }]
    }, {
        'id': 51,
        'name': '四川',
        'citys': [{
            'id': 1,
            'name': '成都',
            'regions': [{
                            '1': '锦江区'
                        },
                        {
                            '2': '青羊区'
                        },
                        {
                            '3': '金牛区'
                        },
                        {
                            '4': '武侯区'
                        },
                        {
                            '5': '成华区'
                        },
                        {
                            '6': '龙泉驿区'
                        },
                        {
                            '7': '青白江区'
                        },
                        {
                            '8': '新都区'
                        },
                        {
                            '9': '温江区'
                        },
                        {
                            '10': '金堂县'
                        },
                        {
                            '11': '双流县'
                        },
                        {
                            '12': '郫县'
                        },
                        {
                            '13': '大邑县'
                        },
                        {
                            '14': '蒲江县'
                        },
                        {
                            '15': '新津县'
                        },
                        {
                            '16': '都江堰市'
                        },
                        {
                            '17': '彭州市'
                        },
                        {
                            '18': '邛崃市'
                        },
                        {
                            '19': '崇州市'
                        },
                        {
                            '20': '其他区'
                        },
                        {
                            '21': '高新西区'
                        },
                        {
                            '22': '高新区'
                        },{
                            '23': '其它'
                        }]
        }, {
            'id': 3,
            'name': '自贡',
            'regions': [{
                            '1': '自流井区'
                        },
                        {
                            '2': '贡井区'
                        },
                        {
                            '3': '大安区'
                        },
                        {
                            '4': '沿滩区'
                        },
                        {
                            '5': '荣县'
                        },
                        {
                            '6': '富顺县'
                        },
                        {
                            '7': '汇东新区'
                        },{
                            '8': '其它'
                        }]
        }, {
            'id': 4,
            'name': '攀枝花',
            'regions': [{
                            '1': '东区'
                        },
                        {
                            '2': '西区'
                        },
                        {
                            '3': '仁和区'
                        },
                        {
                            '4': '米易县'
                        },
                        {
                            '5': '盐边县'
                        },{
                            '6': '其它'
                        }]
        }, {
            'id': 5,
            'name': '泸州',
            'regions': [{
                            '1': '江阳区'
                        },
                        {
                            '2': '纳溪区'
                        },
                        {
                            '3': '龙马潭区'
                        },
                        {
                            '4': '泸县'
                        },
                        {
                            '5': '合江县'
                        },
                        {
                            '6': '叙永县'
                        },
                        {
                            '7': '古蔺县'
                        },{
                            '8': '其它'
                        }]
        }, {
            'id': 6,
            'name': '德阳',
            'regions': [{
                            '1': '旌阳区'
                        },
                        {
                            '2': '中江县'
                        },
                        {
                            '3': '罗江县'
                        },
                        {
                            '4': '广汉市'
                        },
                        {
                            '5': '什邡市'
                        },
                        {
                            '6': '绵竹市'
                        },
                        {
                            '7': '旌湖经济技术开发区'
                        },{
                            '8': '其它'
                        }]
        }, {
            'id': 7,
            'name': '绵阳',
            'regions': [{
                            '1': '涪城区'
                        },
                        {
                            '2': '游仙区'
                        },
                        {
                            '3': '三台县'
                        },
                        {
                            '4': '盐亭县'
                        },
                        {
                            '5': '安县'
                        },
                        {
                            '6': '梓潼县'
                        },
                        {
                            '7': '北川羌族自治县'
                        },
                        {
                            '8': '平武县'
                        },
                        {
                            '9': '江油市'
                        },
                        {
                            '10': '高新区'
                        },
                        {
                            '11': '经开区'
                        },{
                            '12': '其它'
                        }]
        }, {
            'id': 8,
            'name': '广元',
            'regions': [{
                            '1': '利州区'
                        },
                        {
                            '2': '元坝区'
                        },
                        {
                            '3': '朝天区'
                        },
                        {
                            '4': '旺苍县'
                        },
                        {
                            '5': '青川县'
                        },
                        {
                            '6': '剑阁县'
                        },
                        {
                            '7': '苍溪县'
                        },{
                            '8': '其它'
                        }]
        }, {
            'id': 9,
            'name': '遂宁',
            'regions': [{
                            '1': '船山区'
                        },
                        {
                            '2': '安居区'
                        },
                        {
                            '3': '蓬溪县'
                        },
                        {
                            '4': '射洪县'
                        },
                        {
                            '5': '大英县'
                        },
                        {
                            '6': '河东新区'
                        },{
                            '7': '其它'
                        }]
        }, {
            'id': 10,
            'name': '内江',
            'regions': [{
                            '1': '市中区'
                        },
                        {
                            '2': '东兴区'
                        },
                        {
                            '3': '威远县'
                        },
                        {
                            '4': '资中县'
                        },
                        {
                            '5': '隆昌县'
                        },{
                            '6': '其它'
                        }]
        }, {
            'id': 11,
            'name': '乐山',
            'regions': [{
                            '1': '市中区'
                        },
                        {
                            '2': '沙湾区'
                        },
                        {
                            '3': '五通桥区'
                        },
                        {
                            '4': '金口河区'
                        },
                        {
                            '5': '犍为县'
                        },
                        {
                            '6': '井研县'
                        },
                        {
                            '7': '夹江县'
                        },
                        {
                            '8': '沐川县'
                        },
                        {
                            '9': '峨边彝族自治县'
                        },
                        {
                            '10': '马边彝族自治县'
                        },
                        {
                            '11': '峨眉山市'
                        },
                        {
                            '12': '高新技术开发区'
                        },{
                            '13': '其它'
                        }]
        }, {
            'id': 13,
            'name': '南充',
            'regions': [{
                            '1': '顺庆区'
                        },
                        {
                            '2': '高坪区'
                        },
                        {
                            '3': '嘉陵区'
                        },
                        {
                            '4': '南部县'
                        },
                        {
                            '5': '营山县'
                        },
                        {
                            '6': '蓬安县'
                        },
                        {
                            '7': '仪陇县'
                        },
                        {
                            '8': '西充县'
                        },
                        {
                            '9': '阆中市'
                        },{
                            '10': '其它'
                        }]
        }, {
            'id': 14,
            'name': '眉山',
            'regions': [{
                            '1': '东坡区'
                        },
                        {
                            '2': '仁寿县'
                        },
                        {
                            '3': '彭山县'
                        },
                        {
                            '4': '洪雅县'
                        },
                        {
                            '5': '丹棱县'
                        },
                        {
                            '6': '青神县'
                        },{
                            '7': '其它'
                        }]
        }, {
            'id': 15,
            'name': '宜宾',
            'regions': [{
                            '1': '翠屏区'
                        },
                        {
                            '2': '宜宾县'
                        },
                        {
                            '3': '南溪县'
                        },
                        {
                            '4': '江安县'
                        },
                        {
                            '5': '长宁县'
                        },
                        {
                            '6': '高县'
                        },
                        {
                            '7': '珙县'
                        },
                        {
                            '8': '筠连县'
                        },
                        {
                            '9': '兴文县'
                        },
                        {
                            '10': '屏山县'
                        },{
                            '11': '其它'
                        }]
        }, {
            'id': 16,
            'name': '广安',
            'regions': [{
                            '1': '广安区'
                        },
                        {
                            '2': '岳池县'
                        },
                        {
                            '3': '武胜县'
                        },
                        {
                            '4': '邻水县'
                        },
                        {
                            '5': '华蓥市'
                        },{
                            '6': '其它'
                        }]
        }, {
            'id': 17,
            'name': '达州',
            'regions': [{
                            '1': '通川区'
                        },
                        {
                            '2': '达县'
                        },
                        {
                            '3': '宣汉县'
                        },
                        {
                            '4': '开江县'
                        },
                        {
                            '5': '大竹县'
                        },
                        {
                            '6': '渠县'
                        },
                        {
                            '7': '万源市'
                        },{
                            '8': '其它'
                        }]
        }, {
            'id': 18,
            'name': '雅安',
            'regions': [{
                            '1': '雨城区'
                        },
                        {
                            '2': '名山县'
                        },
                        {
                            '3': '荥经县'
                        },
                        {
                            '4': '汉源县'
                        },
                        {
                            '5': '石棉县'
                        },
                        {
                            '6': '天全县'
                        },
                        {
                            '7': '芦山县'
                        },
                        {
                            '8': '宝兴县'
                        },{
                            '9': '其它'
                        }]
        }, {
            'id': 19,
            'name': '巴中',
            'regions': [{
                            '1': '巴州区'
                        },
                        {
                            '2': '通江县'
                        },
                        {
                            '3': '南江县'
                        },
                        {
                            '4': '平昌县'
                        },{
                            '5': '其它'
                        }]
        }, {
            'id': 20,
            'name': '资阳',
            'regions': [{
                            '1': '雁江区'
                        },
                        {
                            '2': '安岳县'
                        },
                        {
                            '3': '乐至县'
                        },
                        {
                            '4': '简阳市'
                        },{
                            '5': '其它'
                        }]
        }, {
            'id': 32,
            'name': '阿坝',
            'regions': [{
                            '1': '汶川县'
                        },
                        {
                            '2': '理县'
                        },
                        {
                            '3': '茂县'
                        },
                        {
                            '4': '松潘县'
                        },
                        {
                            '5': '九寨沟县'
                        },
                        {
                            '6': '金川县'
                        },
                        {
                            '7': '小金县'
                        },
                        {
                            '8': '黑水县'
                        },
                        {
                            '9': '马尔康县'
                        },
                        {
                            '10': '壤塘县'
                        },
                        {
                            '11': '阿坝县'
                        },
                        {
                            '12': '若尔盖县'
                        },
                        {
                            '13': '红原县'
                        },{
                            '14': '其它'
                        }]
        }, {
            'id': 33,
            'name': '甘孜',
            'regions': [{
                            '1': '康定县'
                        },
                        {
                            '2': '泸定县'
                        },
                        {
                            '3': '丹巴县'
                        },
                        {
                            '4': '九龙县'
                        },
                        {
                            '5': '雅江县'
                        },
                        {
                            '6': '道孚县'
                        },
                        {
                            '7': '炉霍县'
                        },
                        {
                            '8': '甘孜县'
                        },
                        {
                            '9': '新龙县'
                        },
                        {
                            '10': '德格县'
                        },
                        {
                            '11': '白玉县'
                        },
                        {
                            '12': '石渠县'
                        },
                        {
                            '13': '色达县'
                        },
                        {
                            '14': '理塘县'
                        },
                        {
                            '15': '巴塘县'
                        },
                        {
                            '16': '乡城县'
                        },
                        {
                            '17': '稻城县'
                        },
                        {
                            '18': '得荣县'
                        },{
                            '19': '其它'
                        }]
        }, {
            'id': 34,
            'name': '凉山',
            'regions': [{
                            '1': '西昌市'
                        },
                        {
                            '2': '木里藏族自治县'
                        },
                        {
                            '3': '盐源县'
                        },
                        {
                            '4': '德昌县'
                        },
                        {
                            '5': '会理县'
                        },
                        {
                            '6': '会东县'
                        },
                        {
                            '7': '宁南县'
                        },
                        {
                            '8': '普格县'
                        },
                        {
                            '9': '布拖县'
                        },
                        {
                            '10': '金阳县'
                        },
                        {
                            '11': '昭觉县'
                        },
                        {
                            '12': '喜德县'
                        },
                        {
                            '13': '冕宁县'
                        },
                        {
                            '14': '越西县'
                        },
                        {
                            '15': '甘洛县'
                        },
                        {
                            '16': '美姑县'
                        },
                        {
                            '17': '雷波县'
                        },{
                            '18': '其它'
                        }]
        }]
    }, {
        'id': 52,
        'name': '贵州',
        'citys': [{
            'id': 1,
            'name': '贵阳',
            'regions': [{
                            '1': '南明区'
                        },
                        {
                            '2': '云岩区'
                        },
                        {
                            '3': '花溪区'
                        },
                        {
                            '4': '乌当区'
                        },
                        {
                            '5': '白云区'
                        },
                        {
                            '6': '小河区'
                        },
                        {
                            '7': '开阳县'
                        },
                        {
                            '8': '息烽县'
                        },
                        {
                            '9': '修文县'
                        },
                        {
                            '10': '清镇市'
                        },
                        {
                            '11': '金阳新区'
                        },{
                            '12': '其它'
                        }]
        }, {
            'id': 2,
            'name': '六盘水',
            'regions': [{
                            '1': '钟山区'
                        },
                        {
                            '2': '六枝特区'
                        },
                        {
                            '3': '水城县'
                        },
                        {
                            '4': '盘县'
                        },{
                            '5': '其它'
                        }]
        }, {
            'id': 3,
            'name': '遵义',
            'regions': [{
                            '1': '红花岗区'
                        },
                        {
                            '2': '汇川区'
                        },
                        {
                            '3': '遵义县'
                        },
                        {
                            '4': '桐梓县'
                        },
                        {
                            '5': '绥阳县'
                        },
                        {
                            '6': '正安县'
                        },
                        {
                            '7': '道真仡佬族苗族自治县'
                        },
                        {
                            '8': '务川仡佬族苗族自治县'
                        },
                        {
                            '9': '凤冈县'
                        },
                        {
                            '10': '湄潭县'
                        },
                        {
                            '11': '余庆县'
                        },
                        {
                            '12': '习水县'
                        },
                        {
                            '13': '赤水市'
                        },
                        {
                            '14': '仁怀市'
                        },{
                            '15': '其它'
                        }]
        }, {
            'id': 4,
            'name': '安顺',
            'regions': [{
                            '1': '西秀区'
                        },
                        {
                            '2': '平坝县'
                        },
                        {
                            '3': '普定县'
                        },
                        {
                            '4': '镇宁布依族苗族自治县'
                        },
                        {
                            '5': '关岭布依族苗族自治县'
                        },
                        {
                            '6': '紫云苗族布依族自治县'
                        },{
                            '7': '其它'
                        }]
        }, {
            'id': 22,
            'name': '铜仁',
            'regions': [{
                            '1': '铜仁市'
                        },
                        {
                            '2': '江口县'
                        },
                        {
                            '3': '玉屏侗族自治县'
                        },
                        {
                            '4': '石阡县'
                        },
                        {
                            '5': '思南县'
                        },
                        {
                            '6': '印江土家族苗族自治县'
                        },
                        {
                            '7': '德江县'
                        },
                        {
                            '8': '沿河土家族自治县'
                        },
                        {
                            '9': '松桃苗族自治县'
                        },
                        {
                            '10': '万山特区'
                        },{
                            '11': '其它'
                        }]
        }, {
            'id': 23,
            'name': '黔西南',
            'regions': [{
                            '1': '兴义市'
                        },
                        {
                            '2': '兴仁县'
                        },
                        {
                            '3': '普安县'
                        },
                        {
                            '4': '晴隆县'
                        },
                        {
                            '5': '贞丰县'
                        },
                        {
                            '6': '望谟县'
                        },
                        {
                            '7': '册亨县'
                        },
                        {
                            '8': '安龙县'
                        },{
                            '9': '其它'
                        }]
        }, {
            'id': 24,
            'name': '毕节',
            'regions': [{
                            '1': '毕节市'
                        },
                        {
                            '2': '大方县'
                        },
                        {
                            '3': '黔西县'
                        },
                        {
                            '4': '金沙县'
                        },
                        {
                            '5': '织金县'
                        },
                        {
                            '6': '纳雍县'
                        },
                        {
                            '7': '威宁彝族回族苗族自治县'
                        },
                        {
                            '8': '赫章县'
                        },{
                            '9': '其它'
                        }]
        }, {
            'id': 26,
            'name': '黔东南',
            'regions': [{
                            '1': '凯里市'
                        },
                        {
                            '2': '黄平县'
                        },
                        {
                            '3': '施秉县'
                        },
                        {
                            '4': '三穗县'
                        },
                        {
                            '5': '镇远县'
                        },
                        {
                            '6': '岑巩县'
                        },
                        {
                            '7': '天柱县'
                        },
                        {
                            '8': '锦屏县'
                        },
                        {
                            '9': '剑河县'
                        },
                        {
                            '10': '台江县'
                        },
                        {
                            '11': '黎平县'
                        },
                        {
                            '12': '榕江县'
                        },
                        {
                            '13': '从江县'
                        },
                        {
                            '14': '雷山县'
                        },
                        {
                            '15': '麻江县'
                        },
                        {
                            '16': '丹寨县'
                        },
                        {
                            '17': '黔东南苗族侗族自治州'
                        },{
                            '18': '其它'
                        }]
        }, {
            'id': 27,
            'name': '黔南',
            'regions': [{
                            '1': '都匀市'
                        },
                        {
                            '2': '福泉市'
                        },
                        {
                            '3': '荔波县'
                        },
                        {
                            '4': '贵定县'
                        },
                        {
                            '5': '瓮安县'
                        },
                        {
                            '6': '独山县'
                        },
                        {
                            '7': '平塘县'
                        },
                        {
                            '8': '罗甸县'
                        },
                        {
                            '9': '长顺县'
                        },
                        {
                            '10': '龙里县'
                        },
                        {
                            '11': '惠水县'
                        },
                        {
                            '12': '三都水族自治县'
                        },
                        {
                            '13': '黔南布依族苗族自治州'
                        },{
                            '14': '其它'
                        }]
        }]
    }, {
        'id': 53,
        'name': '云南',
        'citys': [{
            'id': 1,
            'name': '昆明',
            'regions': [{
                            '1': '五华区'
                        },
                        {
                            '2': '盘龙区'
                        },
                        {
                            '3': '官渡区'
                        },
                        {
                            '4': '西山区'
                        },
                        {
                            '5': '东川区'
                        },
                        {
                            '6': '呈贡县'
                        },
                        {
                            '7': '晋宁县'
                        },
                        {
                            '8': '富民县'
                        },
                        {
                            '9': '宜良县'
                        },
                        {
                            '10': '石林彝族自治县'
                        },
                        {
                            '11': '嵩明县'
                        },
                        {
                            '12': '禄劝彝族苗族自治县'
                        },
                        {
                            '13': '寻甸回族彝族自治县'
                        },
                        {
                            '14': '安宁市'
                        },{
                            '15': '其它'
                        }]
        }, {
            'id': 3,
            'name': '曲靖',
            'regions': [{
                            '1': '麒麟区'
                        },
                        {
                            '2': '马龙县'
                        },
                        {
                            '3': '陆良县'
                        },
                        {
                            '4': '师宗县'
                        },
                        {
                            '5': '罗平县'
                        },
                        {
                            '6': '富源县'
                        },
                        {
                            '7': '会泽县'
                        },
                        {
                            '8': '沾益县'
                        },
                        {
                            '9': '宣威市'
                        },{
                            '10': '其它'
                        }]
        }, {
            'id': 4,
            'name': '玉溪',
            'regions': [{
                            '1': '红塔区'
                        },
                        {
                            '2': '江川县'
                        },
                        {
                            '3': '澄江县'
                        },
                        {
                            '4': '通海县'
                        },
                        {
                            '5': '华宁县'
                        },
                        {
                            '6': '易门县'
                        },
                        {
                            '7': '峨山彝族自治县'
                        },
                        {
                            '8': '新平彝族傣族自治县'
                        },
                        {
                            '9': '元江哈尼族彝族傣族自治县'
                        },{
                            '10': '其它'
                        }]
        }, {
            'id': 5,
            'name': '保山',
            'regions': [{
                            '1': '隆阳区'
                        },
                        {
                            '2': '施甸县'
                        },
                        {
                            '3': '腾冲县'
                        },
                        {
                            '4': '龙陵县'
                        },
                        {
                            '5': '昌宁县'
                        },{
                            '6': '其它'
                        }]
        }, {
            'id': 6,
            'name': '昭通',
            'regions': [{
                            '1': '昭阳区'
                        },
                        {
                            '2': '鲁甸县'
                        },
                        {
                            '3': '巧家县'
                        },
                        {
                            '4': '盐津县'
                        },
                        {
                            '5': '大关县'
                        },
                        {
                            '6': '永善县'
                        },
                        {
                            '7': '绥江县'
                        },
                        {
                            '8': '镇雄县'
                        },
                        {
                            '9': '彝良县'
                        },
                        {
                            '10': '威信县'
                        },
                        {
                            '11': '水富县'
                        },{
                            '12': '其它'
                        }]
        }, {
            'id': 23,
            'name': '楚雄彝族自治州',
            'regions': [{
                            '1': '楚雄市'
                        },
                        {
                            '2': '双柏县'
                        },
                        {
                            '3': '牟定县'
                        },
                        {
                            '4': '南华县'
                        },
                        {
                            '5': '姚安县'
                        },
                        {
                            '6': '大姚县'
                        },
                        {
                            '7': '永仁县'
                        },
                        {
                            '8': '元谋县'
                        },
                        {
                            '9': '武定县'
                        },
                        {
                            '10': '禄丰县'
                        },{
                            '11': '其它'
                        }]
        }, {
            'id': 25,
            'name': '红河哈尼族彝族自治州',
            'regions': [{
                            '1': '个旧市'
                        },
                        {
                            '2': '开远市'
                        },
                        {
                            '3': '蒙自县'
                        },
                        {
                            '4': '屏边苗族自治县'
                        },
                        {
                            '5': '建水县'
                        },
                        {
                            '6': '石屏县'
                        },
                        {
                            '7': '弥勒县'
                        },
                        {
                            '8': '泸西县'
                        },
                        {
                            '9': '元阳县'
                        },
                        {
                            '10': '红河县'
                        },
                        {
                            '11': '金平苗族瑶族傣族自治县'
                        },
                        {
                            '12': '绿春县'
                        },
                        {
                            '13': '河口瑶族自治县'
                        },{
                            '14': '其它'
                        }]
        }, {
            'id': 26,
            'name': '文山',
            'regions': [{
                            '1': '文山县'
                        },
                        {
                            '2': '砚山县'
                        },
                        {
                            '3': '西畴县'
                        },
                        {
                            '4': '麻栗坡县'
                        },
                        {
                            '5': '马关县'
                        },
                        {
                            '6': '丘北县'
                        },
                        {
                            '7': '广南县'
                        },
                        {
                            '8': '富宁县'
                        },{
                            '9': '其它'
                        }]
        }, {
            'id': 28,
            'name': '西双版纳傣族自治州',
            'regions': [{
                            '1': '景洪市'
                        },
                        {
                            '2': '勐海县'
                        },
                        {
                            '3': '勐腊县'
                        },{
                            '4': '其它'
                        }]
        }, {
            'id': 29,
            'name': '大理白族自治州',
            'regions': [{
                            '1': '大理市'
                        },
                        {
                            '2': '漾濞彝族自治县'
                        },
                        {
                            '3': '祥云县'
                        },
                        {
                            '4': '宾川县'
                        },
                        {
                            '5': '弥渡县'
                        },
                        {
                            '6': '南涧彝族自治县'
                        },
                        {
                            '7': '巍山彝族回族自治县'
                        },
                        {
                            '8': '永平县'
                        },
                        {
                            '9': '云龙县'
                        },
                        {
                            '10': '洱源县'
                        },
                        {
                            '11': '剑川县'
                        },
                        {
                            '12': '鹤庆县'
                        },{
                            '13': '其它'
                        }]
        }, {
            'id': 31,
            'name': '德宏傣族景颇族自治州',
            'regions': [{
                            '1': '瑞丽市'
                        },
                        {
                            '2': '潞西市'
                        },
                        {
                            '3': '梁河县'
                        },
                        {
                            '4': '盈江县'
                        },
                        {
                            '5': '陇川县'
                        },{
                            '6': '其它'
                        }]
        }, {
            'id': 32,
            'name': '丽江',
            'regions': [{
                            '1': '古城区'
                        },
                        {
                            '2': '玉龙纳西族自治县'
                        },
                        {
                            '3': '永胜县'
                        },
                        {
                            '4': '华坪县'
                        },
                        {
                            '5': '宁蒗彝族自治县'
                        },{
                            '6': '其它'
                        }]
        }, {
            'id': 33,
            'name': '怒江',
            'regions': [{
                            '1': '泸水县'
                        },
                        {
                            '2': '福贡县'
                        },
                        {
                            '3': '贡山独龙族怒族自治县'
                        },
                        {
                            '4': '兰坪白族普米族自治县'
                        },{
                            '5': '其它'
                        }]
        }, {
            'id': 34,
            'name': '迪庆',
            'regions': [{
                            '1': '香格里拉县'
                        },
                        {
                            '2': '德钦县'
                        },
                        {
                            '3': '维西傈僳族自治县'
                        },{
                            '4': '其它'
                        }]
        }, {
            'id': 35,
            'name': '临沧',
            'regions': [{
                            '1': '临翔区'
                        },
                        {
                            '2': '凤庆县'
                        },
                        {
                            '3': '云县'
                        },
                        {
                            '4': '永德县'
                        },
                        {
                            '5': '镇康县'
                        },
                        {
                            '6': '双江拉祜族佤族布朗族傣族自治县'
                        },
                        {
                            '7': '耿马傣族佤族自治县'
                        },
                        {
                            '8': '沧源佤族自治县'
                        },{
                            '9': '其它'
                        }]
        }, {
            'id': 36,
            'name': '普洱',
            'regions': [{
                            '1': '思茅区'
                        },
                        {
                            '2': '宁洱镇'
                        },
                        {
                            '3': '墨江哈尼族自治县'
                        },
                        {
                            '4': '景东彝族自治县'
                        },
                        {
                            '5': '景谷傣族彝族自治县'
                        },
                        {
                            '6': '镇沅彝族哈尼族拉祜族自治县'
                        },
                        {
                            '7': '江城哈尼族彝族自治县'
                        },
                        {
                            '8': '孟连傣族拉祜族佤族自治县'
                        },
                        {
                            '9': '澜沧拉祜族自治县'
                        },
                        {
                            '10': '西盟佤族自治县'
                        },{
                            '11': '其它'
                        }]
        }]
    }, {
        'id': 54,
        'name': '西藏',
        'citys': [{
            'id': 1,
            'name': '拉萨',
            'regions': [{
                            '1': '城关区'
                        },
                        {
                            '2': '林周县'
                        },
                        {
                            '3': '当雄县'
                        },
                        {
                            '4': '尼木县'
                        },
                        {
                            '5': '曲水县'
                        },
                        {
                            '6': '堆龙德庆县'
                        },
                        {
                            '7': '达孜县'
                        },
                        {
                            '8': '墨竹工卡县'
                        },{
                            '9': '其它'
                        }]
        }, {
            'id': 21,
            'name': '昌都',
            'regions': [{
                            '1': '昌都县'
                        },
                        {
                            '2': '江达县'
                        },
                        {
                            '3': '贡觉县'
                        },
                        {
                            '4': '类乌齐县'
                        },
                        {
                            '5': '丁青县'
                        },
                        {
                            '6': '察雅县'
                        },
                        {
                            '7': '八宿县'
                        },
                        {
                            '8': '左贡县'
                        },
                        {
                            '9': '芒康县'
                        },
                        {
                            '10': '洛隆县'
                        },
                        {
                            '11': '边坝县'
                        },{
                            '12': '其它'
                        }]
        }, {
            'id': 22,
            'name': '山南',
            'regions': [{
                            '1': '乃东县'
                        },
                        {
                            '2': '扎囊县'
                        },
                        {
                            '3': '贡嘎县'
                        },
                        {
                            '4': '桑日县'
                        },
                        {
                            '5': '琼结县'
                        },
                        {
                            '6': '曲松县'
                        },
                        {
                            '7': '措美县'
                        },
                        {
                            '8': '洛扎县'
                        },
                        {
                            '9': '加查县'
                        },
                        {
                            '10': '隆子县'
                        },
                        {
                            '11': '错那县'
                        },
                        {
                            '12': '浪卡子县'
                        },{
                            '13': '其它'
                        }]
        }, {
            'id': 23,
            'name': '日喀则',
            'regions': [{
                            '1': '日喀则市'
                        },
                        {
                            '2': '南木林县'
                        },
                        {
                            '3': '江孜县'
                        },
                        {
                            '4': '定日县'
                        },
                        {
                            '5': '萨迦县'
                        },
                        {
                            '6': '拉孜县'
                        },
                        {
                            '7': '昂仁县'
                        },
                        {
                            '8': '谢通门县'
                        },
                        {
                            '9': '白朗县'
                        },
                        {
                            '10': '仁布县'
                        },
                        {
                            '11': '康马县'
                        },
                        {
                            '12': '定结县'
                        },
                        {
                            '13': '仲巴县'
                        },
                        {
                            '14': '亚东县'
                        },
                        {
                            '15': '吉隆县'
                        },
                        {
                            '16': '聂拉木县'
                        },
                        {
                            '17': '萨嘎县'
                        },
                        {
                            '18': '岗巴县'
                        },
                        {
                            '19': '其他区'
                        },{
                            '20': '其它'
                        }]
        }, {
            'id': 24,
            'name': '那曲',
            'regions': [{
                            '1': '那曲县'
                        },
                        {
                            '2': '嘉黎县'
                        },
                        {
                            '3': '比如县'
                        },
                        {
                            '4': '聂荣县'
                        },
                        {
                            '5': '安多县'
                        },
                        {
                            '6': '申扎县'
                        },
                        {
                            '7': '索县'
                        },
                        {
                            '8': '班戈县'
                        },
                        {
                            '9': '巴青县'
                        },
                        {
                            '10': '尼玛县'
                        },{
                            '11': '其它'
                        }]
        }, {
            'id': 25,
            'name': '阿里',
            'regions': [{
                            '1': '普兰县'
                        },
                        {
                            '2': '札达县'
                        },
                        {
                            '3': '噶尔县'
                        },
                        {
                            '4': '日土县'
                        },
                        {
                            '5': '革吉县'
                        },
                        {
                            '6': '改则县'
                        },
                        {
                            '7': '措勤县'
                        },{
                            '8': '其它'
                        }]
        }, {
            'id': 26,
            'name': '林芝',
            'regions': [{
                            '1': '林芝县'
                        },
                        {
                            '2': '工布江达县'
                        },
                        {
                            '3': '米林县'
                        },
                        {
                            '4': '墨脱县'
                        },
                        {
                            '5': '波密县'
                        },
                        {
                            '6': '察隅县'
                        },
                        {
                            '7': '朗县'
                        },{
                            '8': '其它'
                        }]
        }]
    }, {
        'id': 61,
        'name': '陕西',
        'citys': [{
            'id': 1,
            'name': '西安',
            'regions': [{
                            '1': '新城区'
                        },
                        {
                            '2': '碑林区'
                        },
                        {
                            '3': '莲湖区'
                        },
                        {
                            '4': '灞桥区'
                        },
                        {
                            '5': '未央区'
                        },
                        {
                            '6': '雁塔区'
                        },
                        {
                            '7': '阎良区'
                        },
                        {
                            '8': '临潼区'
                        },
                        {
                            '9': '长安区'
                        },
                        {
                            '10': '蓝田县'
                        },
                        {
                            '11': '周至县'
                        },
                        {
                            '12': '户县'
                        },
                        {
                            '13': '高陵县'
                        },
                        {
                            '14': '高新技术产业开发区'
                        },
                        {
                            '15': '其他区'
                        },
                        {
                            '16': '西安经济技术开发区'
                        }]
        }, {
            'id': 2,
            'name': '铜川',
            'regions': [{
                            '1': '王益区'
                        },
                        {
                            '2': '印台区'
                        },
                        {
                            '3': '耀州区'
                        },
                        {
                            '4': '宜君县'
                        },{
                            '5': '其它'
                        }]
        }, {
            'id': 3,
            'name': '宝鸡',
            'regions': [{
                            '1': '渭滨区'
                        },
                        {
                            '2': '金台区'
                        },
                        {
                            '3': '陈仓区'
                        },
                        {
                            '4': '凤翔县'
                        },
                        {
                            '5': '岐山县'
                        },
                        {
                            '6': '扶风县'
                        },
                        {
                            '7': '眉县'
                        },
                        {
                            '8': '陇县'
                        },
                        {
                            '9': '千阳县'
                        },
                        {
                            '10': '麟游县'
                        },
                        {
                            '11': '凤县'
                        },
                        {
                            '12': '太白县'
                        },
                        {
                            '13': '西南高新技术产业开发区'
                        },{
                            '14': '其它'
                        }]
        }, {
            'id': 4,
            'name': '咸阳',
            'regions': [{
                            '1': '秦都区'
                        },
                        {
                            '2': '杨凌区'
                        },
                        {
                            '3': '渭城区'
                        },
                        {
                            '4': '三原县'
                        },
                        {
                            '5': '泾阳县'
                        },
                        {
                            '6': '乾县'
                        },
                        {
                            '7': '礼泉县'
                        },
                        {
                            '8': '永寿县'
                        },
                        {
                            '9': '彬县'
                        },
                        {
                            '10': '长武县'
                        },
                        {
                            '11': '旬邑县'
                        },
                        {
                            '12': '淳化县'
                        },
                        {
                            '13': '武功县'
                        },
                        {
                            '14': '兴平市'
                        },{
                            '15': '其它'
                        }]
        }, {
            'id': 5,
            'name': '渭南',
            'regions': [{
                            '1': '临渭区'
                        },
                        {
                            '2': '华县'
                        },
                        {
                            '3': '潼关县'
                        },
                        {
                            '4': '大荔县'
                        },
                        {
                            '5': '合阳县'
                        },
                        {
                            '6': '澄城县'
                        },
                        {
                            '7': '蒲城县'
                        },
                        {
                            '8': '白水县'
                        },
                        {
                            '9': '富平县'
                        },
                        {
                            '10': '韩城市'
                        },
                        {
                            '11': '华阴市'
                        },{
                            '12': '其它'
                        }]
        }, {
            'id': 6,
            'name': '延安',
            'regions': [{
                            '1': '宝塔区'
                        },
                        {
                            '2': '延长县'
                        },
                        {
                            '3': '延川县'
                        },
                        {
                            '4': '子长县'
                        },
                        {
                            '5': '安塞县'
                        },
                        {
                            '6': '志丹县'
                        },
                        {
                            '7': '吴起县'
                        },
                        {
                            '8': '甘泉县'
                        },
                        {
                            '9': '富县'
                        },
                        {
                            '10': '洛川县'
                        },
                        {
                            '11': '宜川县'
                        },
                        {
                            '12': '黄龙县'
                        },
                        {
                            '13': '黄陵县'
                        },{
                            '14': '其它'
                        }]
        }, {
            'id': 7,
            'name': '汉中',
            'regions': [{
                            '1': '汉台区'
                        },
                        {
                            '2': '南郑县'
                        },
                        {
                            '3': '城固县'
                        },
                        {
                            '4': '洋县'
                        },
                        {
                            '5': '西乡县'
                        },
                        {
                            '6': '勉县'
                        },
                        {
                            '7': '宁强县'
                        },
                        {
                            '8': '略阳县'
                        },
                        {
                            '9': '镇巴县'
                        },
                        {
                            '10': '留坝县'
                        },
                        {
                            '11': '佛坪县'
                        },{
                            '12': '其它'
                        }]
        }, {
            'id': 8,
            'name': '榆林',
            'regions': [{
                            '1': '榆阳区'
                        },
                        {
                            '2': '神木县'
                        },
                        {
                            '3': '府谷县'
                        },
                        {
                            '4': '横山县'
                        },
                        {
                            '5': '靖边县'
                        },
                        {
                            '6': '定边县'
                        },
                        {
                            '7': '绥德县'
                        },
                        {
                            '8': '米脂县'
                        },
                        {
                            '9': '佳县'
                        },
                        {
                            '10': '吴堡县'
                        },
                        {
                            '11': '清涧县'
                        },
                        {
                            '12': '子洲县'
                        },{
                            '13': '其它'
                        }]
        }, {
            'id': 9,
            'name': '安康',
            'regions': [{
                            '1': '汉滨区'
                        },
                        {
                            '2': '汉阴县'
                        },
                        {
                            '3': '石泉县'
                        },
                        {
                            '4': '宁陕县'
                        },
                        {
                            '5': '紫阳县'
                        },
                        {
                            '6': '岚皋县'
                        },
                        {
                            '7': '平利县'
                        },
                        {
                            '8': '镇坪县'
                        },
                        {
                            '9': '旬阳县'
                        },
                        {
                            '10': '白河县'
                        },{
                            '11': '其它'
                        }]
        }, {
            'id': 10,
            'name': '商洛',
            'regions': [{
                            '1': '商州区'
                        },
                        {
                            '2': '洛南县'
                        },
                        {
                            '3': '丹凤县'
                        },
                        {
                            '4': '商南县'
                        },
                        {
                            '5': '山阳县'
                        },
                        {
                            '6': '镇安县'
                        },
                        {
                            '7': '柞水县'
                        },{
                            '8': '其它'
                        }]
        }]
    }, {
        'id': 62,
        'name': '甘肃',
        'citys': [{
            'id': 1,
            'name': '兰州',
            'regions': [
                        {
                            '1': '城关区'
                        },
                        {
                            '2': '七里河区'
                        },
                        {
                            '3': '西固区'
                        },
                        {
                            '4': '安宁区'
                        },
                        {
                            '5': '红古区'
                        },
                        {
                            '6': '永登县'
                        },
                        {
                            '7': '皋兰县'
                        },
                        {
                            '8': '榆中县'
                        },{
                            '9': '其它'
                        }]
        }, {
            'id': 2,
            'name': '嘉峪关',
            'regions': []
        }, {
            'id': 3,
            'name': '金昌',
            'regions': [{
                            '1': '金川区'
                        },
                        {
                            '2': '永昌县'
                        },{
                            '3': '其它'
                        }]
        }, {
            'id': 4,
            'name': '白银',
            'regions': [{
                            '1': '白银区'
                        },
                        {
                            '2': '平川区'
                        },
                        {
                            '3': '靖远县'
                        },
                        {
                            '4': '会宁县'
                        },
                        {
                            '5': '景泰县'
                        },{
                            '6': '其它'
                        }]
        }, {
            'id': 5,
            'name': '天水',
            'regions': [{
                            '1': '秦城区'
                        },
                        {
                            '2': '麦积区'
                        },
                        {
                            '3': '清水县'
                        },
                        {
                            '4': '秦安县'
                        },
                        {
                            '5': '甘谷县'
                        },
                        {
                            '6': '武山县'
                        },
                        {
                            '7': '张家川回族自治县'
                        },{
                            '8': '其它'
                        }]
        }, {
            'id': 6,
            'name': '武威',
            'regions': [{
                            '1': '凉州区'
                        },
                        {
                            '2': '民勤县'
                        },
                        {
                            '3': '古浪县'
                        },
                        {
                            '4': '天祝藏族自治县'
                        },{
                            '5': '其它'
                        }]
        }, {
            'id': 7,
            'name': '张掖',
            'regions': [{
                            '1': '甘州区'
                        },
                        {
                            '2': '肃南裕固族自治县'
                        },
                        {
                            '3': '民乐县'
                        },
                        {
                            '4': '临泽县'
                        },
                        {
                            '5': '高台县'
                        },
                        {
                            '6': '山丹县'
                        },{
                            '7': '其它'
                        }]
        }, {
            'id': 8,
            'name': '平凉',
            'regions': [{
                            '1': '崆峒区'
                        },
                        {
                            '2': '泾川县'
                        },
                        {
                            '3': '灵台县'
                        },
                        {
                            '4': '崇信县'
                        },
                        {
                            '5': '华亭县'
                        },
                        {
                            '6': '庄浪县'
                        },
                        {
                            '7': '静宁县'
                        },{
                            '8': '其它'
                        }]
        }, {
            'id': 9,
            'name': '酒泉',
            'regions': [{
                            '1': '肃州区'
                        },
                        {
                            '2': '金塔县'
                        },
                        {
                            '3': '瓜州县'
                        },
                        {
                            '4': '肃北蒙古族自治县'
                        },
                        {
                            '5': '阿克塞哈萨克族自治县'
                        },
                        {
                            '6': '玉门市'
                        },
                        {
                            '7': '敦煌市'
                        },{
                            '8': '其它'
                        }]
        }, {
            'id': 10,
            'name': '庆阳',
            'regions': [{
                            '1': '西峰区'
                        },
                        {
                            '2': '庆城县'
                        },
                        {
                            '3': '环县'
                        },
                        {
                            '4': '华池县'
                        },
                        {
                            '5': '合水县'
                        },
                        {
                            '6': '正宁县'
                        },
                        {
                            '7': '宁县'
                        },
                        {
                            '8': '镇原县'
                        },{
                            '9': '其它'
                        }]
        }, {
            'id': 24,
            'name': '定西',
            'regions': [{
                            '1': '安定区'
                        },
                        {
                            '2': '通渭县'
                        },
                        {
                            '3': '陇西县'
                        },
                        {
                            '4': '渭源县'
                        },
                        {
                            '5': '临洮县'
                        },
                        {
                            '6': '漳县'
                        },
                        {
                            '7': '岷县'
                        },{
                            '8': '其它'
                        }]
        }, {
            'id': 26,
            'name': '陇南',
            'regions': [{
                            '1': '武都区'
                        },
                        {
                            '2': '成县'
                        },
                        {
                            '3': '文县'
                        },
                        {
                            '4': '宕昌县'
                        },
                        {
                            '5': '康县'
                        },
                        {
                            '6': '西和县'
                        },
                        {
                            '7': '礼县'
                        },
                        {
                            '8': '徽县'
                        },
                        {
                            '9': '两当县'
                        },{
                            '10': '其它'
                        }]
        }, {
            'id': 29,
            'name': '临夏',
            'regions': [{
                            '1': '临夏市'
                        },
                        {
                            '2': '临夏县'
                        },
                        {
                            '3': '康乐县'
                        },
                        {
                            '4': '永靖县'
                        },
                        {
                            '5': '广河县'
                        },
                        {
                            '6': '和政县'
                        },
                        {
                            '7': '东乡族自治县'
                        },
                        {
                            '8': '积石山保安族东乡'
                        },
                        {
                            '9': '族撒拉族自治县'
                        },{
                            '10': '其它'
                        }]
        }, {
            'id': 30,
            'name': '甘南',
            'regions': [{
                            '1': '合作市'
                        },
                        {
                            '2': '临潭县'
                        },
                        {
                            '3': '卓尼县'
                        },
                        {
                            '4': '舟曲县'
                        },
                        {
                            '5': '迭部县'
                        },
                        {
                            '6': '玛曲县'
                        },
                        {
                            '7': '碌曲县'
                        },
                        {
                            '8': '夏河县'
                        },{
                            '9': '其它'
                        }]
        }]
    }, {
        'id': 63,
        'name': '青海',
        'citys': [{
            'id': 1,
            'name': '西宁',
            'regions': [{
                            '1': '城东区'
                        },
                        {
                            '2': '城中区'
                        },
                        {
                            '3': '城西区'
                        },
                        {
                            '4': '城北区'
                        },
                        {
                            '5': '大通回族土族自治县'
                        },
                        {
                            '6': '湟中县'
                        },
                        {
                            '7': '湟源县'
                        },
                        {
                            '8': '海西蒙古族藏族自治州'
                        },
                        {
                            '9': '海南藏族自治州'
                        },
                        {
                            '10': '果洛藏族自治州'
                        },
                        {
                            '11': '海北藏族自治州'
                        },
                        {
                            '12': '玉树藏族自治州'
                        },
                        {
                            '13': '黄南藏族自治州'
                        },
                        {
                            '14': '海东地区'
                        },{
                            '15': '其它'
                        }]
        }, {
            'id': 21,
            'name': '海东',
            'regions': [{
                            '1': '平安县'
                        },
                        {
                            '2': '民和回族土族自治县'
                        },
                        {
                            '3': '乐都县'
                        },
                        {
                            '4': '互助土族自治县'
                        },
                        {
                            '5': '化隆回族自治县'
                        },
                        {
                            '6': '循化撒拉族自治县'
                        },{
                            '7': '其它'
                        }]
        }, {
            'id': 22,
            'name': '海北',
            'regions': [{
                            '1': '门源回族自治县'
                        },
                        {
                            '2': '祁连县'
                        },
                        {
                            '3': '海晏县'
                        },
                        {
                            '4': '刚察县'
                        },{
                            '5': '其它'
                        }]
        }, {
            'id': 23,
            'name': '黄南',
            'regions': [{
                            '1': '同仁县'
                        },
                        {
                            '2': '尖扎县'
                        },
                        {
                            '3': '泽库县'
                        },
                        {
                            '4': '河南蒙古族自治县'
                        },{
                            '5': '其它'
                        }]
        }, {
            'id': 25,
            'name': '海南市',
            'regions': [{
                            '1': '共和县'
                        },
                        {
                            '2': '同德县'
                        },
                        {
                            '3': '贵德县'
                        },
                        {
                            '4': '兴海县'
                        },
                        {
                            '5': '贵南县'
                        },{
                            '6': '其它'
                        }]
        }, {
            'id': 26,
            'name': '果洛',
            'regions': [{
                            '1': '玛沁县'
                        },
                        {
                            '2': '班玛县'
                        },
                        {
                            '3': '甘德县'
                        },
                        {
                            '4': '达日县'
                        },
                        {
                            '5': '久治县'
                        },
                        {
                            '6': '玛多县'
                        },{
                            '7': '其它'
                        }]
        }, {
            'id': 27,
            'name': '玉树',
            'regions': [{
                            '1': '玉树县'
                        },
                        {
                            '2': '杂多县'
                        },
                        {
                            '3': '称多县'
                        },
                        {
                            '4': '治多县'
                        },
                        {
                            '5': '囊谦县'
                        },
                        {
                            '6': '曲麻莱县'
                        },{
                            '7': '其它'
                        }]
        }, {
            'id': 28,
            'name': '海西',
            'regions': [{
                            '1': '格尔木市'
                        },
                        {
                            '2': '德令哈市'
                        },
                        {
                            '3': '乌兰县'
                        },
                        {
                            '4': '都兰县'
                        },
                        {
                            '5': '天峻县'
                        },
                        {
                            '6': '大柴旦行委'
                        },
                        {
                            '7': '茫崖行委'
                        },
                        {
                            '8': '冷湖行委'
                        },{
                            '9': '其它'
                        }]
        }]
    }, {
        'id': 64,
        'name': '宁夏',
        'citys': [{
            'id': 1,
            'name': '银川',
            'regions': [{
                            '1': '兴庆区'
                        },
                        {
                            '2': '西夏区'
                        },
                        {
                            '3': '金凤区'
                        },
                        {
                            '4': '永宁县'
                        },
                        {
                            '5': '贺兰县'
                        },
                        {
                            '6': '灵武市'
                        },{
                            '7': '其它'
                        }]
        }, {
            'id': 2,
            'name': '石嘴山',
            'regions': [{
                            '1': '大武口区'
                        },
                        {
                            '2': '惠农区'
                        },
                        {
                            '3': '平罗县'
                        },{
                            '4': '其它'
                        }]
        }, {
            'id': 3,
            'name': '吴忠',
            'regions': [{
                            '1': '利通区'
                        },
                        {
                            '2': '红寺堡区'
                        },
                        {
                            '3': '盐池县'
                        },
                        {
                            '4': '同心县'
                        },
                        {
                            '5': '青铜峡市'
                        },{
                            '6': '其它'
                        }]
        }, {
            'id': 4,
            'name': '固原',
            'regions': [{
                            '1': '原州区'
                        },
                        {
                            '2': '西吉县'
                        },
                        {
                            '3': '隆德县'
                        },
                        {
                            '4': '泾源县'
                        },
                        {
                            '5': '彭阳县'
                        },{
                            '6': '其它'
                        }]
        }, {
            'id': 5,
            'name': '中卫',
            'regions': [{
                            '1': '沙坡头区'
                        },
                        {
                            '2': '中宁县'
                        },
                        {
                            '3': '海原县'
                        },{
                            '4': '其它'
                        }]
        }]
    }, {
        'id': 65,
        'name': '新疆',
        'citys': [{
            'id': 1,
            'name': '乌鲁木齐',
            'regions': [{
                            '1': '天山区'
                        },
                        {
                            '2': '沙依巴克区'
                        },
                        {
                            '3': '新市区'
                        },
                        {
                            '4': '水磨沟区'
                        },
                        {
                            '5': '头屯河区'
                        },
                        {
                            '6': '达坂城区'
                        },
                        {
                            '7': '米东区'
                        },
                        {
                            '8': '乌鲁木齐县'
                        },{
                            '9': '其它'
                        }]
        }, {
            'id': 2,
            'name': '克拉玛依',
            'regions': [{
                            '1': '独山子区'
                        },
                        {
                            '2': '克拉玛依区'
                        },
                        {
                            '3': '白碱滩区'
                        },
                        {
                            '4': '乌尔禾区'
                        },{
                            '5': '其它'
                        }]
        }, {
            'id': 21,
            'name': '吐鲁番',
            'regions': [{
                            '1': '吐鲁番市'
                        },
                        {
                            '2': '鄯善县'
                        },
                        {
                            '3': '托克逊县'
                        },{
                            '4': '其它'
                        }]
        }, {
            'id': 22,
            'name': '哈密',
            'regions': [{
                            '1': '哈密市'
                        },
                        {
                            '2': '巴里坤哈萨克自治县'
                        },
                        {
                            '3': '伊吾县'
                        },{
                            '4': '其它'
                        }]
        }, {
            'id': 23,
            'name': '昌吉',
            'regions': [{
                            '1': '昌吉市'
                        },
                        {
                            '2': '阜康市'
                        },
                        {
                            '3': '呼图壁县'
                        },
                        {
                            '4': '玛纳斯县'
                        },
                        {
                            '5': '奇台县'
                        },
                        {
                            '6': '吉木萨尔县'
                        },
                        {
                            '7': '木垒哈萨克自治县'
                        },{
                            '8': '其它'
                        }]
        }, {
            'id': 27,
            'name': '博尔塔拉',
            'regions': [{
                            '1': '博乐市'
                        },
                        {
                            '2': '精河县'
                        },
                        {
                            '3': '温泉县'
                        },{
                            '4': '其它'
                        }]
        }, {
            'id': 28,
            'name': '巴音郭楞',
            'regions': [{
                            '1': '库尔勒市'
                        },
                        {
                            '2': '轮台县'
                        },
                        {
                            '3': '尉犁县'
                        },
                        {
                            '4': '若羌县'
                        },
                        {
                            '5': '且末县'
                        },
                        {
                            '6': '焉耆回族自治县'
                        },
                        {
                            '7': '和静县'
                        },
                        {
                            '8': '和硕县'
                        },
                        {
                            '9': '博湖县'
                        },{
                            '10': '其它'
                        }]
        }, {
            'id': 29,
            'name': '阿克苏',
            'regions': [{
                            '1': '阿克苏市'
                        },
                        {
                            '2': '温宿县'
                        },
                        {
                            '3': '库车县'
                        },
                        {
                            '4': '沙雅县'
                        },
                        {
                            '5': '新和县'
                        },
                        {
                            '6': '拜城县'
                        },
                        {
                            '7': '乌什县'
                        },
                        {
                            '8': '阿瓦提县'
                        },
                        {
                            '9': '柯坪县'
                        },{
                            '10': '其它'
                        }]
        }, {
            'id': 30,
            'name': '克孜勒苏',
            'regions': [{
                            '1': '阿图什市'
                        },
                        {
                            '2': '阿克陶县'
                        },
                        {
                            '3': '阿合奇县'
                        },
                        {
                            '4': '乌恰县'
                        },{
                            '5': '其它'
                        }]
        }, {
            'id': 31,
            'name': '喀什',
            'regions': [{
                            '1': '喀什市'
                        },
                        {
                            '2': '疏附县'
                        },
                        {
                            '3': '疏勒县'
                        },
                        {
                            '4': '英吉沙县'
                        },
                        {
                            '5': '泽普县'
                        },
                        {
                            '6': '莎车县'
                        },
                        {
                            '7': '叶城县'
                        },
                        {
                            '8': '麦盖提县'
                        },
                        {
                            '9': '岳普湖县'
                        },
                        {
                            '10': '伽师县'
                        },
                        {
                            '11': '巴楚县'
                        },
                        {
                            '12': '塔什库尔干县塔吉克自治'
                        },{
                            '13': '其它'
                        }]
        }, {
            'id': 32,
            'name': '和田',
            'regions': [{
                            '1': '和田市'
                        },
                        {
                            '2': '和田县'
                        },
                        {
                            '3': '墨玉县'
                        },
                        {
                            '4': '皮山县'
                        },
                        {
                            '5': '洛浦县'
                        },
                        {
                            '6': '策勒县'
                        },
                        {
                            '7': '于田县'
                        },
                        {
                            '8': '民丰县'
                        },{
                            '9': '其它'
                        }]
        }, {
            'id': 40,
            'name': '伊犁',
            'regions': [{
                            '1': '伊宁市'
                        },
                        {
                            '2': '奎屯市'
                        },
                        {
                            '3': '伊宁县'
                        },
                        {
                            '4': '察布查尔锡伯自治县'
                        },
                        {
                            '5': '霍城县'
                        },
                        {
                            '6': '巩留县'
                        },
                        {
                            '7': '新源县'
                        },
                        {
                            '8': '昭苏县'
                        },
                        {
                            '9': '特克斯县'
                        },
                        {
                            '10': '尼勒克县'
                        },{
                            '11': '其它'
                        }]
        }, {
            'id': 42,
            'name': '塔城',
            'regions': [{
                            '1': '塔城市'
                        },
                        {
                            '2': '乌苏市'
                        },
                        {
                            '3': '额敏县'
                        },
                        {
                            '4': '沙湾县'
                        },
                        {
                            '5': '托里县'
                        },
                        {
                            '6': '裕民县'
                        },
                        {
                            '7': '和布克赛尔蒙古自治县'
                        },{
                            '8': '其它'
                        }]
        }, {
            'id': 43,
            'name': '阿勒泰',
            'regions': [{
                            '1': '阿勒泰市'
                        },
                        {
                            '2': '布尔津县'
                        },
                        {
                            '3': '富蕴县'
                        },
                        {
                            '4': '福海县'
                        },
                        {
                            '5': '哈巴河县'
                        },
                        {
                            '6': '青河县'
                        },
                        {
                            '7': '吉木乃县'
                        },{
                            '8': '其它'
                        }]
        }, {
            'id': 44,
            'name': '石河子',
            'regions': []
        }, {
            'id': 45,
            'name': '阿拉尔',
            'regions': []
        }, {
            'id': 46,
            'name': '图木舒克',
            'regions': []
        }, {
            'id': 47,
            'name': '五家渠',
            'regions': []
        },{
            'id': 48,
            'name': '奎屯',
            'regions': []
        }]
    }, {
        'id': 71,
        'name': '台湾',
        'citys': [{
            'id': 1,
            'name': '台北',
            'regions': [{
                            '1': '信义区'
                        },
                        {
                            '2': '南港区'
                        },
                        {
                            '3': '松山区'
                        },
                        {
                            '4': '士林区'
                        },
                        {
                            '5': '文山区'
                        },
                        {
                            '6': '中正区'
                        },
                        {
                            '7': '大安区'
                        },
                        {
                            '8': '北投区'
                        },
                        {
                            '9': '大同区'
                        },
                        {
                            '10': '万华区'
                        },
                        {
                            '11': '内湖区'
                        },
                        {
                            '12': '中山区'
                        },{
                            '13': '其它'
                        }]
        }, {
            'id': 2,
            'name': '高雄',
            'regions': [{
                            '1': '芩雅区'
                        },
                        {
                            '2': '前镇区'
                        },
                        {
                            '3': '小港区'
                        },
                        {
                            '4': '盐埕区'
                        },
                        {
                            '5': '三民区'
                        },
                        {
                            '6': '新兴区'
                        },
                        {
                            '7': '鼓山区'
                        },
                        {
                            '8': '左营区'
                        },
                        {
                            '9': '前金区'
                        },
                        {
                            '10': '旗津区'
                        },
                        {
                            '11': '楠梓区'
                        },{
                            '12': '其它'
                        }]
        }, {
            'id': 3,
            'name': '基隆市',
            'regions': [{
                            '1': '中正区'
                        },
                        {
                            '2': '七堵区'
                        },
                        {
                            '3': '中山区'
                        },
                        {
                            '4': '仁爱区'
                        },
                        {
                            '5': '安乐区'
                        },
                        {
                            '6': '信义区'
                        },
                        {
                            '7': '暖暖区'
                        },{
                            '8': '其它'
                        }]
        }, {
            'id': 4,
            'name': '台中市',
            'regions': [{
                            '1': '北区'
                        },
                        {
                            '2': '南屯区'
                        },
                        {
                            '3': '中区'
                        },
                        {
                            '4': '西区'
                        },
                        {
                            '5': '东区'
                        },
                        {
                            '6': '北屯区'
                        },
                        {
                            '7': '南区'
                        },
                        {
                            '8': '西屯区'
                        },{
                            '9': '其它'
                        }]
        }, {
            'id': 5,
            'name': '台南市',
            'regions': [{
                            '1': '南区'
                        },
                        {
                            '2': '北区'
                        },
                        {
                            '3': '中西区'
                        },
                        {
                            '4': '安平区'
                        },
                        {
                            '5': '东区'
                        },
                        {
                            '6': '安南区'
                        },
                        {
                            '7': '南区'
                        },
                        {
                            '8': '西屯区'
                        },{
                            '9': '其它'
                        }]
        }, {
            'id': 6,
            'name': '新竹市',
            'regions': [{
                            '1': '东区'
                        },
                        {
                            '2': '北区'
                        },
                        {
                            '3': '香山区'
                        },{
                            '4': '其它'
                        }]
        }, {
            'id': 7,
            'name': '嘉义市',
            'regions': [{
                            '1': '西区'
                        },
                        {
                            '2': '东区'
                        },{
                            '3': '其它'
                        }]
        }, {
            'id': 8,
            'name': '新竹县',
            'regions': []
        }, {
            'id': 9,
            'name': '嘉义县',
            'regions': []
        }, {
            'id': 10,
            'name': '澎湖县',
            'regions': []
        }, {
            'id': 11,
            'name': '桃园县',
            'regions': []
        }, {
            'id': 12,
            'name': '云林县',
            'regions': []
        }, {
            'id': 13,
            'name': '花莲县',
            'regions': []
        }, {
            'id': 14,
            'name': '宜兰县',
            'regions': []
        }, {
            'id': 15,
            'name': '南投县',
            'regions': []
        }, {
            'id': 17,
            'name': '台东县',
            'regions': []
        }, {
            'id': 18,
            'name': '台北县',
            'regions': []
        }, {
            'id': 19,
            'name': '彰化县',
            'regions': []
        }, {
            'id': 20,
            'name': '屏东县',
            'regions': []
        }, {
            'id': 21,
            'name': '台中县',
            'regions': []
        }, {
            'id': 22,
            'name': '高雄县',
            'regions': []
        }, {
            'id': 23,
            'name': '苗栗县',
            'regions': []
        }, {
            'id': 24,
            'name': '台南县',
            'regions': []
        }]
    }, {
        'id': 81,
        'name': '香港',
        'citys': [{
                'id': 1,
                'name': '銅鑼灣',
                'regions': []
        },{
                'id': 2,
                'name': '西貢',
                'regions': []
        },{
                'id': 3,
                'name': '新界(西區)',
                'regions': []
        },{
                'id': 4,
                'name': '黃大仙區',
                'regions': []
        },{
                'id': 5,
                'name': '九龍半島',
                'regions': []
        },{
                'id': 6,
                'name': '油尖旺區',
                'regions': []
        },{
                'id':7,
                'name': '大埔區',
                'regions': []
        },{
                'id': 8,
                'name': '觀塘區',
                'regions': []
        },{
                'id': 9,
                'name': '荃灣區',
                'regions': []
        },{
                'id': 10,
                'name': '屯門區',
                'regions': []
        },{
                'id': 11,
                'name': '中環',
                'regions': []
        },{
                'id': 12,
                'name': '深水埗區',
                'regions': []
        },{
                'id': 13,
                'name': '旺角',
                'regions': []
        },{
                'id': 14,
                'name': '九龍城',
                'regions': []
        },{
                'id': 15,
                'name': '深水灣',
                'regions': []
        },{
                'id': 16,
                'name': '淺水灣',
                'regions': []
        },{
                'id': 17,
                'name': '太平山',
                'regions': []
        },{
                'id': 18,
                'name': '葵青區',
                'regions': []
        },{
                'id': 19,
                'name': '新界(北區)',
                'regions': []
        },{
                'id': 20,
                'name': '灣仔區',
                'regions': []
        },{
                'id': 21,
                'name': '赤柱',
                'regions': []
        },{
                'id': 22,
                'name': '（港島）中西區',
                'regions': []
        },{
                'id': 23,
                'name': '新界(東區)',
                'regions': []
        },{
                'id': 24,
                'name': '沙田區',
                'regions': []
        },{
                'id': 25,
                'name': '香港島',
                'regions': []
        },{
                'id': 26,
                'name': '（港島）東區',
                'regions': []
        },{
                'id': 27,
                'name': '元朗區',
                'regions': []
        },{
                'id': 28,
                'name': '米埔',
                'regions': []
        },{
                'id': 29,
                'name': '（港島）南區',
                'regions': []
        },{
                'id': 30,
                'name': '尖沙咀',
                'regions': []
        },{
                'id': 31,
                'name': '離島區',
                'regions': []
        },{
                'id': 32,
                'name': '其它區',
                'regions': []
        }]
//      }]
    }, {
        'id': 82,
        'name': '澳门',
        'citys': [{
            'id': 1,
            'name': '路氹城',
            'regions': []
        },{
            'id': 2,
            'name': '路環',
            'regions': []
        },{
            'id': 3,
            'name': '氹仔',
            'regions': []
        },{
            'id': 4,
            'name': '澳门半岛',
            'regions': []
        },{
                'id': 31,
                'name': '其它區',
                'regions': []
        }]
    }]
}

/**
 * 转换locationData数据格式为map型
 * @xiaohai 2014.2.11 改为三级联动
 */
var locationMap = {},
    provincesArr = locationData.provinces;
for (var i = 0, ilen = provincesArr.length; i < ilen; i++) {
    var p_key = provincesArr[i].id,
        p_value = provincesArr[i];
    delete provincesArr[i]['id'];

    var cities = {},
        cityArr = p_value.citys;
    for (var j = 0, jlen = cityArr.length; j < jlen; j++) {
        var regions = {},
            c_id = cityArr[j].id,
            c_name = cityArr[j].name,
            c_regions = cityArr[j].regions;
        for (var k = 0, klen = c_regions.length; k < klen; k++) {
            regions[k + 1] = c_regions[k][k + 1];
        }
        cities[c_id] = {};
        cities[c_id].name = c_name;
        cities[c_id].regions = regions;
    }
    delete p_value.citys;
    p_value['cities'] = cities;

    locationMap[p_key] = p_value;
};

// @tofishes
// 参数: 省id, 市id, 间隔符号, 无省市时候的默认替代文字
function getLocation(provinceId, cityId, regionId, symbol, emptyPlacehoder) {
    var rst = emptyPlacehoder || '不限',
        province = locationMap[provinceId],
        city,
        region;
    symbol = symbol || ' - ';

    if (province) {
        rst = province.name;
        city = province.cities[cityId] ? province.cities[cityId].name : '';
        region = province.cities[cityId] ? province.cities[cityId].regions[regionId] : '';
        if (city) rst += symbol + city;
        if (region) rst += symbol + region;
    }

    return rst;
}

/*
 * @xiaohai 2014.2.12 修改为3级联动后此方法失效（还是二级），需要时请修改后再使用
 * pro: '北京市 朝阳区'
 * rst: 11-5
 */
// function getLocValue(pro) {
//     var rst = {},
//         loc = pro.split(' ');

//     $.each(locationData.provinces, function(idx, v) {
//         if (v.name == loc[0]) {
//             rst.province = v.id
//             $.each(v.citys, function(index, elm) {
//                 if (elm[index + 1] == loc[1]) {
//                     rst.city = index + 1;
//                     return false;
//                 }
//             });
//             return false;
//         }
//     });
//     return rst;
// }

/*
*   根据省市的id, 直接获取相对应的省市名
*   @Julian
*   @param pid 省id
*   @param cid 市id
*   @param rid 市id
*   return {
*       province: '山东',
*       city: '青岛',
*       region: '市南区'
*   }
**/
LocationChain.getLocationString = function (pid, cid, rid) {
    var provinceObj = locationMap[pid], 
        city = provinceObj.cities[cid],
        region = city.regions[rid] || '不限';
    if (!provinceObj) {
        return {
            province: '不限',
            city: '不限',
            region: '不限'
        }
    } else if (!city) {
        return {
            province: provinceObj.name,
            city: '不限',
            region: '不限'
        }
    } else {
        return {
            province: provinceObj.name,
            city: city.name,
            region: region
        }
    }
}