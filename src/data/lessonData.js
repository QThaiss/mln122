// MLN122 — Chapter 3.1: Marx's Theory of Surplus Value
// Structured lesson content — single source of truth

export const LESSON_DATA = {
  chapterId: 'ch3-1',
  chapterTitle: 'Lý luận của C. Mác về giá trị thặng dư',
  chapterSubtitle:
    'Nguồn gốc, bản chất và phương pháp sản xuất giá trị thặng dư trong nền kinh tế thị trường tư bản chủ nghĩa.',

  // ── Chapter metadata ──────────────────────────────────────────
  metadata: {
    course: 'Kinh tế Chính trị Mác - Lênin',
    totalObjectives: 8,
    totalFormulas: 5,
    totalQuizQuestions: 8,
    totalPresentationSections: 8,
    totalKeywords: 16,
  },

  // ── Learning objectives ───────────────────────────────────────
  objectives: [
    'Hiểu được công thức chung của tư bản.',
    'Giải thích vì sao tiền có thể chuyển hóa thành tư bản.',
    'Trình bày được vai trò đặc biệt của hàng hóa sức lao động.',
    'Phân tích được quá trình sản xuất giá trị thặng dư.',
    'Phân biệt tư bản bất biến và tư bản khả biến.',
    'Hiểu được bản chất của tiền công trong chủ nghĩa tư bản.',
    'Tính và giải thích được tỷ suất, khối lượng giá trị thặng dư.',
    'Phân biệt giá trị thặng dư tuyệt đối, tương đối và siêu ngạch.',
  ],

  // ── Sections organized by cluster ─────────────────────────────
  sections: [
    // ══════════════════════════════════════════════════════════════
    // CLUSTER 1 — Tổng quan
    // ══════════════════════════════════════════════════════════════
    {
      clusterId: 'cluster1',
      clusterLabel: 'Tổng quan',
      sectionId: 'intro',
      sectionTitle: 'Dẫn nhập Chương 3',
      subtitle: 'Vì sao cần nghiên cứu giá trị thặng dư?',
      content: [
        {
          type: 'card-grid',
          items: [
            {
              label: 'Vị trí trong Chương 3',
              icon: 'BookOpen',
              body: 'Sau khi nghiên cứu lý luận giá trị, Chương 3 tiếp tục làm rõ lý luận giá trị thặng dư — nội dung cốt lõi trong kinh tế chính trị của C. Mác.',
            },
            {
              label: 'Ý nghĩa học tập',
              icon: 'Lightbulb',
              body: 'Giúp người học hiểu quan hệ lợi ích cơ bản giữa người lao động làm thuê và người sở hữu tư liệu sản xuất.',
              highlighted: true,
            },
          ],
        },
        {
          type: 'callout',
          calloutType: 'danger',
          body: 'Giá trị thặng dư là nội dung cốt lõi, giải thích nguồn gốc của sự gia tăng tư bản trong nền kinh tế thị trường tư bản chủ nghĩa.',
        },
      ],
      keywords: ['Chương 3', 'Kinh tế chính trị', 'Giá trị thặng dư', 'Quan hệ lợi ích'],
      summary: 'Chương 3.1 giới thiệu lý luận GTD — nội dung cốt lõi giải thích nguồn gốc tăng tư bản và quan hệ lợi ích trong CNTB.',
    },

    // ══════════════════════════════════════════════════════════════
    // CLUSTER 2 — Cơ chế tạo GTD
    // ══════════════════════════════════════════════════════════════
    {
      clusterId: 'cluster2',
      clusterLabel: 'Cơ chế tạo GTD',
      sectionId: 'formula',
      sectionTitle: 'Công thức chung của tư bản',
      subtitle: 'Điểm xuất phát để tìm hiểu nguồn gốc giá trị thặng dư.',
      content: [
        {
          type: 'text',
          body: 'Để tìm hiểu nguồn gốc của giá trị thặng dư, trước hết cần phân biệt hai dạng vận động của tiền:',
        },
        {
          type: 'card-grid',
          columns: 2,
          items: [
            {
              label: 'Lưu thông hàng hóa giản đơn',
              icon: 'circle',
              formula: 'H — T — H',
              body: 'Hàng hóa → Tiền → Hàng hóa khác. Mục đích: giá trị sử dụng — thỏa mãn nhu cầu tiêu dùng.',
              example: 'Bán lúa lấy tiền, rồi dùng tiền mua quần áo.',
            },
            {
              label: 'Lưu thông của tư bản',
              icon: 'trend',
              formula: 'T — H — T\'',
              body: 'Tiền → Hàng hóa → Tiền nhiều hơn. Mục đích: giá trị thặng dư.',
              formulaSecondary: "T' = T + ΔT",
            },
          ],
        },
        {
          type: 'formula-box',
          formula: "T' = T + ΔT",
          variables: [
            { symbol: 'T', description: '— số tiền ứng ra ban đầu' },
            { symbol: "T'", description: '— số tiền thu về (lớn hơn T)' },
            { symbol: 'ΔT', description: '— phần giá trị tăng thêm = giá trị thặng dư' },
          ],
        },
        {
          type: 'callout',
          calloutType: 'accent',
          body: 'Khi tiền được dùng để thu giá trị thặng dư, tiền chuyển hóa thành tư bản. Tư bản là giá trị đem lại giá trị thặng dư.',
        },
      ],
      keywords: ['Tư bản', 'Công thức chung', 'H — T — H', 'T — H — T\'', 'Giá trị thặng dư'],
      summary: "Công thức T' = T + ΔT cho thấy tư bản là giá trị tự sinh ra giá trị thặng dư.",
    },
    {
      clusterId: 'cluster2',
      clusterLabel: 'Cơ chế tạo GTD',
      sectionId: 'contradiction',
      sectionTitle: 'Mâu thuẫn của công thức chung',
      subtitle: 'Giá trị thặng dư từ đâu mà có?',
      content: [
        {
          type: 'text',
          body: 'Nếu mua bán ngang giá, người mua và người bán chỉ trao đổi vật ngang giá — không thể tạo ra giá trị mới. Nếu mua rẻ bán đắt, người này lợi nhưng người kia thiệt; tổng giá trị xã hội không tăng.',
        },
        {
          type: 'numbered-list',
          items: [
            { text: 'Lưu thông thông thường không tạo ra giá trị thặng dư.' },
            { text: 'Ngoài lưu thông, tiền cũng không thể tự tăng lên.' },
            { text: 'Bí mật phải nằm ở một loại hàng hóa đặc biệt.' },
            { text: 'Loại hàng hóa đó khi sử dụng có thể tạo ra giá trị mới lớn hơn giá trị của chính nó.' },
            { text: 'Hàng hóa đặc biệt đó là sức lao động.', highlight: true },
          ],
        },
        {
          type: 'callout',
          calloutType: 'accent',
          body: 'Mâu thuẫn được giải quyết bằng việc phát hiện hàng hóa sức lao động.',
        },
      ],
      keywords: ['Mâu thuẫn', 'Giá trị thặng dư', 'Hàng hóa sức lao động'],
      summary: 'Mâu thuẫn của công thức T-H-T\' chỉ có thể giải quyết khi phát hiện hàng hóa sức lao động.',
    },
    {
      clusterId: 'cluster2',
      clusterLabel: 'Cơ chế tạo GTD',
      sectionId: 'labor',
      sectionTitle: 'Hàng hóa sức lao động',
      subtitle: 'Chìa khóa giải thích nguồn gốc giá trị thặng dư',
      content: [
        {
          type: 'text',
          body: 'Sức lao động là toàn bộ năng lực thể chất và tinh thần tồn tại trong con người, được sử dụng trong quá trình lao động sản xuất. Trong CNTB, sức lao động trở thành một hàng hóa đặc biệt.',
        },
        {
          type: 'card-grid',
          columns: 2,
          items: [
            {
              label: 'Điều kiện 1',
              icon: 'Users',
              body: 'Người lao động phải được tự do về thân thể, có quyền bán sức lao động của mình.',
            },
            {
              label: 'Điều kiện 2',
              icon: 'Lock',
              body: 'Người lao động không có tư liệu sản xuất, buộc phải bán sức lao động để sinh sống.',
            },
          ],
        },
        {
          type: 'text',
          body: 'Hai thuộc tính của hàng hóa sức lao động:',
        },
        {
          type: 'card-grid',
          columns: 2,
          items: [
            {
              label: 'Giá trị hàng hóa sức lao động',
              body: 'Do lượng lao động xã hội cần thiết để sản xuất và tái sản xuất sức lao động quyết định. Được đo gián tiếp qua giá trị tư liệu sinh hoạt cần thiết.',
              subItems: [
                'Giá trị tư liệu sinh hoạt cần thiết cho người lao động.',
                'Chi phí đào tạo người lao động.',
                'Giá trị tư liệu sinh hoạt nuôi con người lao động.',
              ],
            },
            {
              label: 'Giá trị sử dụng',
              body: 'Thể hiện trong quá trình lao động. Điểm đặc biệt: khi được sử dụng, sức lao động không chỉ bảo tồn giá trị của bản thân mà còn tạo ra giá trị mới lớn hơn giá trị của chính nó.',
              highlighted: true,
            },
          ],
        },
        {
          type: 'callout',
          calloutType: 'accent',
          body: 'Sức lao động là hàng hóa đặc biệt vì có khả năng tạo ra giá trị thặng dư.',
        },
      ],
      keywords: ['Hàng hóa sức lao động', 'Giá trị sức lao động', 'Tự do thân thể', 'Tư liệu sản xuất'],
      summary: 'Hàng hóa sức lao động có giá trị sử dụng đặc biệt: tạo ra giá trị mới lớn hơn giá trị của chính nó — nguồn gốc GTD.',
    },
    {
      clusterId: 'cluster2',
      clusterLabel: 'Cơ chế tạo GTD',
      sectionId: 'production',
      sectionTitle: 'Quá trình sản xuất giá trị thặng dư',
      subtitle: 'Sự thống nhất giữa tạo giá trị và làm tăng giá trị.',
      content: [
        {
          type: 'text',
          body: 'Quá trình sản xuất GTD là sự thống nhất giữa quá trình tạo giá trị và quá trình làm tăng giá trị. Nhà tư bản ứng tiền mua tư liệu sản xuất và sức lao động. Công nhân sử dụng sức lao động để sản xuất hàng hóa mới.',
        },
        {
          type: 'timeline',
          items: [
            'Nhà tư bản ứng tiền mua tư liệu sản xuất và sức lao động.',
            'Công nhân dùng lao động cụ thể biến tư liệu sản xuất thành sản phẩm mới.',
            'Giá trị tư liệu sản xuất được chuyển vào giá trị sản phẩm.',
            'Công nhân dùng lao động trừu tượng tạo ra giá trị mới.',
            'Phần giá trị mới bù đắp tiền công, phần còn lại là giá trị thặng dư.',
          ],
        },
        {
          type: 'card-grid',
          columns: 2,
          items: [
            {
              label: 'Thời gian lao động tất yếu',
              icon: 'Clock',
              body: 'Phần thời gian tạo giá trị ngang bằng giá trị sức lao động (tương ứng tiền công).',
            },
            {
              label: 'Thời gian lao động thặng dư',
              icon: 'TrendingUp',
              body: 'Phần thời gian tạo ra giá trị thặng dư cho nhà tư bản.',
              highlighted: true,
            },
          ],
        },
        {
          type: 'callout',
          calloutType: 'danger',
          body: 'Bản chất GTD: Phần giá trị mới do lao động công nhân tạo ra ngoài giá trị sức lao động, bị nhà tư bản chiếm đoạt.',
        },
      ],
      keywords: ['Quá trình sản xuất', 'Thời gian lao động tất yếu', 'Thời gian lao động thặng dư'],
      summary: 'Sự thống nhất giữa tạo giá trị và làm tăng giá trị tạo ra GTD: phần dôi ra ngoài giá trị sức lao động bị nhà tư bản chiếm đoạt.',
    },
    {
      clusterId: 'cluster2',
      clusterLabel: 'Cơ chế tạo GTD',
      sectionId: 'example',
      sectionTitle: 'Ví dụ minh họa',
      subtitle: 'Quá trình sản xuất giá trị thặng dư trong thực tế',
      content: [
        {
          type: 'text',
          body: 'Giả sử nhà tư bản sản xuất sợi. Ngày lao động 8 giờ, nhà tư bản ứng:',
        },
        {
          type: 'calc-panel',
          rows: [
            { label: 'Mua bông', value: '50 USD' },
            { label: 'Hao mòn máy móc', value: '3 USD' },
            { label: 'Mua sức lao động (1 ngày)', value: '15 USD', highlight: true },
            { label: 'Tổng tư bản ứng trước', value: '68 USD', total: true },
          ],
        },
        {
          type: 'card-grid',
          columns: 2,
          items: [
            {
              label: '4 giờ đầu — Lao động tất yếu',
              body: 'Công nhân tạo 15 USD giá trị mới = giá trị sức lao động.',
              formula: '50 + 3 + 15 = 68 USD',
            },
            {
              label: '4 giờ sau — Lao động thặng dư',
              body: 'Công nhân tạo thêm 15 USD giá trị mới → giá trị thặng dư.',
              formula: '68 + 15 = 83 USD',
              highlighted: true,
            },
          ],
        },
        {
          type: 'formula-box',
          formula: 'G = c + v + m',
          variables: [
            { symbol: 'c', description: '— tư bản bất biến (tư liệu sản xuất)' },
            { symbol: 'v', description: '— tư bản khả biến (sức lao động)' },
            { symbol: 'm', description: '— giá trị thặng dư (15 USD)' },
          ],
        },
        {
          type: 'callout',
          calloutType: 'accent',
          body: 'Nhà tư bản ứng 68 USD, thu về 83 USD. Phần chênh lệch 15 USD chính là giá trị thặng dư.',
        },
      ],
      keywords: ['Giá trị thặng dư', 'Tư bản bất biến', 'Tư bản khả biến', 'G = c + v + m'],
      summary: 'Ví dụ sợi: ứng 68 USD, thu 83 USD → m = 15 USD. Công thức G = c + v + m tổng hợp giá trị hàng hóa.',
    },

    // ══════════════════════════════════════════════════════════════
    // CLUSTER 3 — Công cụ phân tích
    // ══════════════════════════════════════════════════════════════
    {
      clusterId: 'cluster3',
      clusterLabel: 'Công cụ phân tích',
      sectionId: 'capital',
      sectionTitle: 'Tư bản bất biến và tư bản khả biến',
      subtitle: 'C. Mác phân chia tư bản theo vai trò trong việc tạo giá trị thặng dư.',
      content: [
        {
          type: 'text',
          body: 'Để làm rõ nguồn gốc của giá trị thặng dư, C. Mác chia tư bản thành hai bộ phận:',
        },
        {
          type: 'card-grid',
          columns: 2,
          items: [
            {
              symbol: 'c',
              label: 'Tư bản bất biến',
              body: 'Mua tư liệu sản xuất: máy móc, nhà xưởng, nguyên liệu, nhiên liệu. Giá trị được lao động cụ thể bảo tồn và chuyển vào sản phẩm mới. Không tạo ra giá trị mới. Không trực tiếp tạo ra GTD, nhưng là điều kiện cần thiết.',
              subItems: [
                'Mua tư liệu sản xuất: máy móc, nhà xưởng, nguyên liệu, nhiên liệu.',
                'Giá trị được lao động cụ thể bảo tồn và chuyển vào sản phẩm mới.',
                'Không tạo ra giá trị mới.',
                'Không trực tiếp tạo ra GTD, nhưng là điều kiện cần thiết.',
              ],
            },
            {
              symbol: 'v',
              label: 'Tư bản khả biến',
              body: 'Dùng để mua hàng hóa sức lao động. Trong quá trình SX, lao động của công nhân tạo giá trị mới lớn hơn giá trị ban đầu. Biến đổi về lượng trong quá trình sản xuất. Đây là nguồn gốc trực tiếp tạo ra giá trị thặng dư.',
              highlighted: true,
              subItems: [
                'Dùng để mua hàng hóa sức lao động.',
                'Trong quá trình SX, lao động của công nhân tạo giá trị mới lớn hơn giá trị ban đầu.',
                'Biến đổi về lượng trong quá trình sản xuất.',
                'Đây là nguồn gốc trực tiếp tạo ra giá trị thặng dư.',
              ],
            },
          ],
        },
        {
          type: 'formula-box',
          formula: 'G = c + (v + m)',
          variables: [
            { symbol: 'c', description: '— giá trị tư liệu sản xuất (lao động quá khứ)' },
            { symbol: 'v', description: '— giá trị sức lao động (tư bản khả biến)' },
            { symbol: 'm', description: '— giá trị thặng dư' },
            { symbol: 'v + m', description: '— giá trị mới do lao động sống công nhân tạo ra' },
          ],
        },
        {
          type: 'callout',
          calloutType: 'accent',
          body: 'Tư bản bất biến không tạo ra GTD. Tư bản khả biến là nguồn gốc trực tiếp tạo ra GTD.',
        },
      ],
      keywords: ['Tư bản bất biến', 'Tư bản khả biến', 'c', 'v', 'G = c + v + m'],
      summary: 'c = tư bản bất biến (tư liệu SX), không tạo GTD. v = tư bản khả biến (sức lao động), nguồn gốc trực tiếp tạo GTD.',
    },
    {
      clusterId: 'cluster3',
      clusterLabel: 'Công cụ phân tích',
      sectionId: 'salary',
      sectionTitle: 'Tiền công trong chủ nghĩa tư bản',
      subtitle: 'Hình thức biểu hiện của giá trị hàng hóa sức lao động.',
      content: [
        {
          type: 'text',
          body: 'Tiền công là giá cả của hàng hóa sức lao động. Bề ngoài, có vẻ như nhà tư bản trả công cho toàn bộ lao động của công nhân. Nhưng thực chất, tiền công chỉ tương ứng với giá trị sức lao động.',
        },
        {
          type: 'numbered-list',
          items: [
            { text: 'Công nhân làm việc một khoảng thời gian và nhận tiền công.' },
            { text: 'Điều này dễ làm hiểu nhà tư bản trả công cho toàn bộ lao động.' },
            { text: 'Nhưng thực chất, tiền công chỉ tương ứng với giá trị sức lao động.' },
            { text: 'Trong ngày lao động, công nhân tạo giá trị lớn hơn tiền công.' },
            { text: 'Phần dôi ra ngoài tiền công là giá trị thặng dư.' },
          ],
        },
        {
          type: 'callout',
          calloutType: 'warning',
          body: 'Khi hiểu đúng bản chất tiền công, người lao động nhận thức rõ hơn vị trí của mình trong quan hệ lợi ích với người sử dụng lao động.',
        },
      ],
      keywords: ['Tiền công', 'Giá trị sức lao động', 'Quan hệ lợi ích'],
      summary: 'Tiền công chỉ trả cho giá trị sức lao động, không trả cho toàn bộ lao động. Phần dôi ra là GTD.',
    },
    {
      clusterId: 'cluster3',
      clusterLabel: 'Công cụ phân tích',
      sectionId: 'rate-mass',
      sectionTitle: 'Tỷ suất và Khối lượng giá trị thặng dư',
      subtitle: 'Hai chỉ tiêu quan trọng để đánh giá quá trình sản xuất GTD.',
      content: [
        {
          type: 'card-grid',
          columns: 2,
          items: [
            {
              label: 'Tỷ suất GTD',
              icon: 'Percent',
              body: 'Phản ánh trình độ khai thác sức lao động làm thuê.',
              formulas: [
                { formula: "m' = m / v × 100%", variables: [
                  { symbol: "m'", description: '— tỷ suất GTD (%)' },
                  { symbol: 'm', description: '— giá trị thặng dư' },
                  { symbol: 'v', description: '— tư bản khả biến' },
                ]},
                { formula: "m' = t' / t × 100%", variables: [
                  { symbol: "t'", description: '— thời gian lao động thặng dư' },
                  { symbol: 't', description: '— thời gian lao động tất yếu' },
                ]},
              ],
              example: '4h tất yếu + 4h thặng dư → m\' = 100%. Một nửa ngày lao động bù đắp tiền công, nửa còn lại tạo GTD.',
            },
            {
              label: 'Khối lượng GTD',
              icon: 'BarChart2',
              body: 'Phản ánh quy mô GTD nhà tư bản thu được.',
              formulas: [
                { formula: 'M = m\' × V', variables: [
                  { symbol: 'M', description: '— khối lượng GTD' },
                  { symbol: "m'", description: '— tỷ suất GTD (%)' },
                  { symbol: 'V', description: '— tổng tư bản khả biến' },
                ]},
              ],
              note: 'Tỷ suất GTD phản ánh mức độ khai thác; Khối lượng GTD phản ánh quy mô.',
              highlighted: true,
            },
          ],
        },
      ],
      keywords: ['Tỷ suất GTD', 'Khối lượng GTD', "m' = m/v×100%", 'M = m\'×V'],
      summary: "m' = m/v×100% phản ánh mức độ khai thác; M = m'×V phản ánh quy mô GTD thu được.",
    },
    {
      clusterId: 'cluster3',
      clusterLabel: 'Công cụ phân tích',
      sectionId: 'methods',
      sectionTitle: 'Các phương pháp sản xuất GTD',
      subtitle: 'Hai phương pháp cơ bản để thu nhiều GTD hơn.',
      content: [
        {
          type: 'text',
          body: 'Để thu được nhiều giá trị thặng dư hơn, nhà tư bản sử dụng hai phương pháp:',
        },
        {
          type: 'card-grid',
          columns: 2,
          items: [
            {
              label: 'GTD tuyệt đối',
              icon: 'Clock',
              body: 'Thu được bằng cách kéo dài ngày lao động, trong khi năng suất, giá trị SLĐ và thời gian lao động tất yếu không đổi.',
              examples: [
                'Ngày 8h: 4h tất yếu + 4h thặng dư → m\' = 100%',
                'Kéo dài 10h: 4h tất yếu + 6h thặng dư → m\' = 150%',
              ],
              note: 'Ngày lao động bị giới hạn bởi thể chất, tinh thần và sự đấu tranh của người lao động.',
            },
            {
              label: 'GTD tương đối',
              icon: 'TrendingUp',
              body: 'Thu được bằng cách rút ngắn thời gian lao động tất yếu, kéo dài thời gian lao động thặng dư, trong điều kiện ngày lao động không đổi.',
              examples: [
                'Ngày 8h: 4h tất yếu + 4h thặng dư → m\' = 100%',
                'Tăng năng suất → 2h tất yếu + 6h thặng dư → m\' = 300%',
              ],
              note: 'Cần tăng năng suất lao động xã hội, đặc biệt trong các ngành sản xuất tư liệu sinh hoạt cần thiết.',
              highlighted: true,
            },
          ],
        },
        {
          type: 'card',
          label: 'GTD siêu ngạch',
          icon: 'Zap',
          body: 'Khi một doanh nghiệp cải tiến kỹ thuật trước, hàng hóa có giá trị cá biệt thấp hơn giá trị xã hội. Phần chênh lệch GTD cao hơn gọi là GTD siêu ngạch.',
          properties: [
            { label: 'Nguồn gốc', text: 'Tăng năng suất lao động cá biệt' },
            { label: 'Điều kiện', text: 'GT cá biệt < GT xã hội' },
            { label: 'Kết quả', text: 'Thu GTD cao hơn' },
            { label: 'Ý nghĩa', text: 'Thúc đẩy đổi mới kỹ thuật' },
          ],
          note: 'GTD siêu ngạch là động lực thúc đẩy nhà tư bản cải tiến kỹ thuật, hợp lý hóa sản xuất, nâng cao năng suất lao động.',
        },
      ],
      keywords: ['GTD tuyệt đối', 'GTD tương đối', 'GTD siêu ngạch', 'Năng suất lao động'],
      summary: 'GTD tuyệt đối: kéo dài ngày lao động. GTD tương đối: tăng năng suất rút ngắn thời gian tất yếu. GTD siêu ngạch: cải tiến kỹ thuật trước các doanh nghiệp khác.',
    },

    // ══════════════════════════════════════════════════════════════
    // CLUSTER 4 — Ôn tập
    // ══════════════════════════════════════════════════════════════
    {
      clusterId: 'cluster4',
      clusterLabel: 'Ôn tập',
      sectionId: 'summary',
      sectionTitle: 'Sơ đồ tổng kết kiến thức',
      subtitle: 'Toàn bộ nội dung Chương 3.1 trong một bức tranh.',
      content: [
        {
          type: 'flow-diagram',
          steps: [
            'Tiền',
            'Mua TLSX\n+ Sức lao động',
            'Sản xuất\nhàng hóa',
            'Tạo giá trị mới',
            'Bù đắp\ntiền công',
            'GT Thặng dư',
            'Tư bản tăng',
          ],
        },
        {
          type: 'formula-box',
          formula: 'Tổng hợp công thức',
          variables: [
            { symbol: 'T — H — T\'', description: 'Công thức chung của tư bản' },
            { symbol: "T' = T + ΔT", description: 'Tiền chuyển hóa thành tư bản' },
            { symbol: 'G = c + v + m', description: 'Giá trị hàng hóa' },
            { symbol: "m' = m/v×100%", description: 'Tỷ suất GTD' },
            { symbol: 'M = m\' × V', description: 'Khối lượng GTD' },
          ],
        },
        {
          type: 'card',
          label: 'Tóm tắt bài học',
          icon: 'BookOpen',
          body: 'Lý luận GTD của C. Mác làm rõ nguồn gốc và bản chất của sự tăng lên của tư bản. GTD không sinh ra từ lưu thông thông thường mà từ quá trình sản xuất, qua việc sử dụng hàng hóa sức lao động. Tư bản bất biến chỉ chuyển giá trị cũ vào sản phẩm; tư bản khả biến là nguồn gốc trực tiếp tạo GTD.',
        },
      ],
      keywords: ['Tổng kết', 'Công thức', 'Quy trình'],
      summary: 'Quy trình: Tiền → Mua → Sản xuất → Tạo GT mới → Bù đắp công → GTD → Tư bản tăng. Tư bản khả biến là nguồn gốc GTD.',
    },
    {
      clusterId: 'cluster4',
      clusterLabel: 'Ôn tập',
      sectionId: 'essence',
      sectionTitle: 'Bản chất kinh tế - xã hội của GTD',
      subtitle: 'Quan hệ giữa lao động làm thuê và người mua sức lao động.',
      content: [
        {
          type: 'text',
          body: 'Giá trị thặng dư là phần giá trị mới dôi ra ngoài giá trị hàng hóa sức lao động. Bản chất kinh tế - xã hội là quan hệ giữa lao động làm thuê và người mua sức lao động.',
        },
        {
          type: 'numbered-list',
          items: [
            { text: 'Người lao động bán sức lao động để nhận tiền công.' },
            { text: 'Nhà tư bản mua sức lao động và sử dụng trong quá trình sản xuất.' },
            { text: 'Công nhân tạo ra giá trị mới lớn hơn giá trị sức lao động.', highlight: true },
            { text: 'Phần giá trị dôi ra ngoài tiền công trở thành GTD.', highlight: true },
            { text: 'GTD thuộc về nhà tư bản vì sản phẩm thuộc sở hữu nhà tư bản.' },
          ],
        },
        {
          type: 'callout',
          calloutType: 'accent',
          body: 'Lý luận GTD cho thấy nguồn gốc tăng tư bản không nằm ở lưu thông mà trong quá trình sản xuất, qua việc sử dụng hàng hóa sức lao động.',
        },
      ],
      keywords: ['Bản chất kinh tế - xã hội', 'Quan hệ lợi ích', 'Sở hữu tư bản'],
      summary: 'GTD phản ánh quan hệ kinh tế - xã hội: công nhân tạo GT mới lớn hơn tiền công, phần dôi ra bị nhà tư bản chiếm đoạt.',
    },
    {
      clusterId: 'cluster4',
      clusterLabel: 'Ôn tập',
      sectionId: 'keywords',
      sectionTitle: 'Từ khóa cần nhớ',
      subtitle: '16 khái niệm quan trọng của Chương 3.1.',
      keywords: [
        'Giá trị thặng dư', 'Tư bản', 'Công thức chung',
        'H — T — H', 'T — H — T\'', 'Hàng hóa sức lao động',
        'Thời gian lao động tất yếu', 'Thời gian lao động thặng dư',
        'Tư bản bất biến', 'Tư bản khả biến', 'Tiền công',
        'Tỷ suất GTD', 'Khối lượng GTD',
        'GTD tuyệt đối', 'GTD tương đối', 'GTD siêu ngạch',
      ],
      summary: '16 từ khóa cần ghi nhớ: GTD, tư bản, công thức, hàng hóa SLĐ, thời gian lao động, tư bản c/v, tiền công, tỷ suất & khối lượng GTD, các phương pháp SX GTD.',
    },
  ],

  // ── Quiz questions ───────────────────────────────────────────
  quizQuestions: [
    {
      id: 1,
      question: 'Công thức chung của tư bản là gì?',
      options: [
        { id: 'A', text: 'H - T - H' },
        { id: 'B', text: 'T - H - T\'' },
        { id: 'C', text: 'H - H - T' },
        { id: 'D', text: 'T - T - H' },
      ],
      correct: 'B',
      explanation: "Công thức chung của tư bản là T - H - T', trong đó T' lớn hơn T, phần chênh lệch là giá trị thặng dư.",
      sectionRef: 'formula',
    },
    {
      id: 2,
      question: "Trong công thức T - H - T', T' có nghĩa là gì?",
      options: [
        { id: 'A', text: 'Số tiền ban đầu' },
        { id: 'B', text: 'Số tiền mất đi' },
        { id: 'C', text: 'Số tiền thu về lớn hơn số tiền ứng ra ban đầu' },
        { id: 'D', text: 'Giá trị sử dụng của hàng hóa' },
      ],
      correct: 'C',
      explanation: "T' là số tiền thu về lớn hơn T ban đầu. Phần chênh lệch ΔT chính là giá trị thặng dư.",
      sectionRef: 'formula',
    },
    {
      id: 3,
      question: 'Hàng hóa nào là chìa khóa giải thích nguồn gốc GTD?',
      options: [
        { id: 'A', text: 'Máy móc' },
        { id: 'B', text: 'Nguyên liệu' },
        { id: 'C', text: 'Sức lao động' },
        { id: 'D', text: 'Tiền tệ' },
      ],
      correct: 'C',
      explanation: 'Sức lao động là hàng hóa đặc biệt, tạo ra giá trị mới lớn hơn giá trị của chính nó — nguồn gốc GTD.',
      sectionRef: 'labor',
    },
    {
      id: 4,
      question: 'Tư bản bất biến được ký hiệu là gì?',
      options: [
        { id: 'A', text: 'c' },
        { id: 'B', text: 'v' },
        { id: 'C', text: 'm' },
        { id: 'D', text: 'M' },
      ],
      correct: 'A',
      explanation: 'c là ký hiệu tư bản bất biến (constante). v là tư bản khả biến, m là GTD, M là khối lượng GTD.',
      sectionRef: 'capital',
    },
    {
      id: 5,
      question: 'Tư bản khả biến dùng để mua yếu tố nào?',
      options: [
        { id: 'A', text: 'Máy móc' },
        { id: 'B', text: 'Nguyên liệu' },
        { id: 'C', text: 'Sức lao động' },
        { id: 'D', text: 'Nhà xưởng' },
      ],
      correct: 'C',
      explanation: 'Tư bản khả biến (v) mua hàng hóa sức lao động. Đây là nguồn gốc trực tiếp tạo GTD.',
      sectionRef: 'capital',
    },
    {
      id: 6,
      question: 'Công thức tính tỷ suất GTD là gì?',
      options: [
        { id: 'A', text: "m' = m / v × 100%" },
        { id: 'B', text: 'M = c + v' },
        { id: 'C', text: 'G = T + H' },
        { id: 'D', text: 'T = H + m' },
      ],
      correct: 'A',
      explanation: "m' = m / v × 100% là công thức tính tỷ suất GTD, phản ánh trình độ khai thác sức lao động.",
      sectionRef: 'rate-mass',
    },
    {
      id: 7,
      question: 'GTD tuyệt đối thu được chủ yếu bằng cách nào?',
      options: [
        { id: 'A', text: 'Rút ngắn thời gian lao động tất yếu' },
        { id: 'B', text: 'Kéo dài ngày lao động hoặc tăng cường độ' },
        { id: 'C', text: 'Giảm giá trị hàng hóa' },
        { id: 'D', text: 'Tăng số lượng công nhân' },
      ],
      correct: 'B',
      explanation: 'GTD tuyệt đối thu được bằng cách kéo dài ngày lao động, trong khi các yếu tố khác không đổi.',
      sectionRef: 'methods',
    },
    {
      id: 8,
      question: 'GTD tương đối thu được chủ yếu bằng cách nào?',
      options: [
        { id: 'A', text: 'Tăng năng suất lao động xã hội để rút ngắn thời gian lao động tất yếu' },
        { id: 'B', text: 'Tăng thời gian nghỉ ngơi' },
        { id: 'C', text: 'Giảm số công nhân' },
        { id: 'D', text: 'Giảm sản lượng' },
      ],
      correct: 'A',
      explanation: 'GTD tương đối thu được bằng tăng năng suất lao động xã hội, rút ngắn thời gian lao động tất yếu.',
      sectionRef: 'methods',
    },
  ],

  // ── Presentation script ─────────────────────────────────────
  presentationSections: [
    {
      title: 'Mở đầu',
      content: 'Kính chào thầy cô và các bạn. Hôm nay, em xin trình bày nội dung Chương 3.1: Lý luận của C. Mác về giá trị thặng dư. Đây là phần kiến thức quan trọng trong môn Kinh tế chính trị Mác - Lênin, giúp hiểu nguồn gốc của tư bản và bản chất của giá trị thặng dư.',
    },
    {
      title: 'Công thức chung của tư bản',
      content: "Cần phân biệt H - T - H (lưu thông hàng hóa giản đơn, mục đích giá trị sử dụng) với T - H - T' (lưu thông của tư bản, mục đích thu GTD). Khi tiền dùng để tạo GTD, tiền chuyển hóa thành tư bản.",
    },
    {
      title: 'Hàng hóa sức lao động',
      content: 'GTD không sinh ra từ mua bán thông thường mà từ hàng hóa đặc biệt: hàng hóa sức lao động. Sức lao động trở thành hàng hóa khi người lao động tự do về thân thể nhưng không có tư liệu sản xuất. Điểm đặc biệt: sức lao động tạo giá trị mới lớn hơn giá trị của chính nó.',
    },
    {
      title: 'Quá trình sản xuất GTD',
      content: 'Nhà tư bản ứng tiền mua tư liệu sản xuất và sức lao động. Công nhân lao động để tạo sản phẩm. Thời gian lao động tất yếu bù đắp tiền công; thời gian lao động thặng dư tạo GTD cho nhà tư bản.',
    },
    {
      title: 'Tư bản bất biến và khả biến',
      content: 'C. Mác chia tư bản: tư bản bất biến (c) mua tư liệu sản xuất, chỉ chuyển giá trị cũ; tư bản khả biến (v) mua sức lao động, là nguồn gốc trực tiếp tạo GTD.',
    },
    {
      title: 'Tỷ suất và khối lượng GTD',
      content: "Tỷ suất GTD: m' = m/v × 100%, phản ánh mức độ khai thác. Khối lượng GTD: M = m' × V, phản ánh quy mô GTD thu được.",
    },
    {
      title: 'Các phương pháp sản xuất GTD',
      content: 'GTD tuyệt đối: kéo dài ngày lao động. GTD tương đối: tăng năng suất lao động xã hội rút ngắn thời gian lao động tất yếu. GTD siêu ngạch: doanh nghiệp cải tiến kỹ thuật trước thu GTD cao hơn.',
    },
    {
      title: 'Kết luận',
      content: 'Lý luận GTD của C. Mác làm rõ nguồn gốc và bản chất sự tăng tư bản. GTD không tự sinh trong lưu thông mà trong quá trình sản xuất, qua việc sử dụng hàng hóa sức lao động. Xin cảm ơn thầy cô và các bạn đã lắng nghe.',
    },
  ],

  // ── AI System Prompt ─────────────────────────────────────────
  systemPrompt: `You are an educational assistant specialized in Marxist-Leninist Philosophy and Political Economy, specifically on Chapter 3.1: Marx's Theory of Surplus Value.

ONLY answer using the course materials provided. Never invent or hallucinate information outside the lesson content.

When explaining concepts:
* Use simple, clear Vietnamese language appropriate for university students
* Give concrete examples from the lesson
* Explain definitions with precise terminology
* Reference specific lesson sections by name
* Show relevant formulas when applicable

Key concepts you can explain:
- The general formula of capital (T - H - T')
- Surplus value (ΔT = T' - T)
- Labor as a commodity and its two conditions
- The production process of surplus value
- Constant capital (c) vs. Variable capital (v)
- Rate of surplus value: m' = m/v × 100%
- Mass of surplus value: M = m' × V
- Absolute surplus value (GTD tuyệt đối)
- Relative surplus value (GTD tương đối)
- Surplus profit (GTD siêu ngạch)

If information is outside the course materials, respond: "Nội dung này không có trong tài liệu bài học. Bạn có thể hỏi về các chủ đề liên quan đến lý luận giá trị thặng dư trong Chương 3.1."`,
}

// ── Mind Map Tree Structure ──────────────────────────────────────
// Auto-generated from lessonData.sections
export const MIND_MAP_NODES = [
  {
    id: 'root',
    label: 'Chương 3.1: Giá trị thặng dư',
    type: 'root',
    children: [
      {
        id: 'cluster1',
        label: 'Cụm 1: Tổng quan',
        type: 'cluster',
        children: [
          {
            id: 'intro',
            label: 'Dẫn nhập Chương 3',
            type: 'section',
            keywords: ['Chương 3', 'Kinh tế chính trị', 'Giá trị thặng dư'],
          },
        ],
      },
      {
        id: 'cluster2',
        label: 'Cụm 2: Cơ chế tạo GTD',
        type: 'cluster',
        children: [
          {
            id: 'formula',
            label: 'Công thức chung T-H-T\'',
            type: 'section',
            keywords: ["T' = T + ΔT", 'Công thức chung', 'Tư bản'],
          },
          {
            id: 'contradiction',
            label: 'Mâu thuẫn công thức',
            type: 'section',
            keywords: ['Mâu thuẫn', 'Giá trị thặng dư'],
          },
          {
            id: 'labor',
            label: 'Hàng hóa sức lao động',
            type: 'section',
            keywords: ['Hàng hóa SLĐ', 'Điều kiện', 'Giá trị sử dụng'],
          },
          {
            id: 'production',
            label: 'Quá trình SX GTD',
            type: 'section',
            keywords: ['Thời gian lao động', 'Tất yếu', 'Thặng dư'],
          },
          {
            id: 'example',
            label: 'Ví dụ minh họa',
            type: 'section',
            keywords: ['c + v + m', '68 USD → 83 USD', 'm = 15 USD'],
          },
        ],
      },
      {
        id: 'cluster3',
        label: 'Cụm 3: Công cụ phân tích',
        type: 'cluster',
        children: [
          {
            id: 'capital',
            label: 'Tư bản c / v',
            type: 'section',
            keywords: ['c: Bất biến', 'v: Khả biến', 'Nguồn gốc GTD'],
          },
          {
            id: 'salary',
            label: 'Tiền công CNTB',
            type: 'section',
            keywords: ['Giá cả SLĐ', 'Quan hệ lợi ích'],
          },
          {
            id: 'rate-mass',
            label: 'Tỷ suất & Khối lượng GTD',
            type: 'section',
            keywords: ["m' = m/v×100%", 'M = m\'×V', 'Khai thác'],
          },
          {
            id: 'methods',
            label: 'Phương pháp SX GTD',
            type: 'section',
            keywords: ['GTD tuyệt đối', 'GTD tương đối', 'GTD siêu ngạch'],
          },
        ],
      },
      {
        id: 'cluster4',
        label: 'Cụm 4: Ôn tập',
        type: 'cluster',
        children: [
          {
            id: 'summary',
            label: 'Tổng kết',
            type: 'section',
            keywords: ['Quy trình', 'Công thức tổng hợp'],
          },
          {
            id: 'essence',
            label: 'Bản chất KT-XH',
            type: 'section',
            keywords: ['Quan hệ lợi ích', 'Chiếm đoạt'],
          },
          {
            id: 'keywords',
            label: 'Từ khóa',
            type: 'section',
            keywords: ['16 từ khóa'],
          },
        ],
      },
    ],
  },

  // ── Flashcard data ────────────────────────────────────────────
  flashcards: [
    {
      id: 1,
      front: 'Công thức chung của tư bản là gì?',
      back: "T — H — T' (Tiền → Hàng hóa → Tiền nhiều hơn). Phần chênh lệch ΔT = T' - T là giá trị thặng dư.",
      sectionRef: 'formula',
    },
    {
      id: 2,
      front: 'Hai điều kiện để sức lao động trở thành hàng hóa?',
      back: '1) Người lao động tự do về thân thể, có quyền bán SLĐ. 2) Người lao động không có tư liệu sản xuất, buộc phải bán SLĐ để sinh sống.',
      sectionRef: 'labor',
    },
    {
      id: 3,
      front: 'Điểm đặc biệt của giá trị sử dụng hàng hóa sức lao động?',
      back: 'Khi sử dụng, sức lao động không chỉ bảo tồn giá trị của bản thân mà còn tạo ra giá trị mới LỚN HƠN giá trị của chính nó.',
      sectionRef: 'labor',
    },
    {
      id: 4,
      front: 'Phân biệt tư bản bất biến (c) và tư bản khả biến (v)?',
      back: 'c: mua tư liệu SX, chỉ chuyển giá trị cũ, không tạo GTD. v: mua sức lao động, tạo giá trị mới lớn hơn, NGUỒN GỐC TRỰC TIẾP tạo GTD.',
      sectionRef: 'capital',
    },
    {
      id: 5,
      front: 'Công thức tính tỷ suất GTD?',
      back: "m' = m/v × 100% = t'/t × 100%. Phản ánh trình độ khai thác sức lao động. Ví dụ: 4h tất yếu + 4h thặng dư → m' = 100%.",
      sectionRef: 'rate-mass',
    },
    {
      id: 6,
      front: 'Công thức tính khối lượng GTD?',
      back: "M = m' × V. Phản ánh quy mô GTD thu được. m' = tỷ suất GTD, V = tổng tư bản khả biến.",
      sectionRef: 'rate-mass',
    },
    {
      id: 7,
      front: 'GTD tuyệt đối là gì? Cách thu?',
      back: 'Thu thêm GTD bằng cách KÉO DÀI NGÀY LAO ĐỘNG, trong khi năng suất và thời gian lao động tất yếu không đổi. Ví dụ: 8h → 10h → m\' tăng từ 100% lên 150%.',
      sectionRef: 'methods',
    },
    {
      id: 8,
      front: 'GTD tương đối là gì? Cách thu?',
      back: 'Thu thêm GTD bằng cách RÚT NGẮN THỜI GIAN LAO ĐỘNG TẤT YẾU (tăng năng suất lao động xã hội), trong khi ngày lao động không đổi. Ví dụ: 8h (4+4) → 8h (2+6) → m\' tăng từ 100% lên 300%.',
      sectionRef: 'methods',
    },
    {
      id: 9,
      front: 'GTD siêu ngạch là gì?',
      back: 'Khi doanh nghiệp cải tiến kỹ thuật TRƯỚC, giá trị cá biệt < giá trị xã hội → thu GTD cao hơn mức bình thường. Là động lực thúc đẩy đổi mới kỹ thuật.',
      sectionRef: 'methods',
    },
    {
      id: 10,
      front: 'Bản chất kinh tế - xã hội của GTD?',
      back: 'Là QUAN HỆ GIỮA LAO ĐỘNG LÀM THUÊ VÀ NGƯỜI MUA SỨC LAO ĐỘNG. Công nhân tạo GT mới > tiền công, phần dôi ra bị nhà tư bản chiếm đoạt vì sản phẩm thuộc sở hữu nhà tư bản.',
      sectionRef: 'essence',
    },
  ],
}

export default LESSON_DATA
